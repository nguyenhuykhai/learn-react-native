import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateContext';
import ValidatedInput from '../components/ValidatedInput';
import { validate } from '../utils/validation';
import { BASE_URL } from '../api/apiService';

const CreateCategoryScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [item, setItem] = useState({
    id: 1,
    name: '',
    weight: '',
    rating: '',
    price: '',
    image: '',
    color: '',
    bonus: '',
    origin: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useGlobalState();

  const validationRules = {
    name: [{ condition: (value) => value !== null && value !== undefined && value !== '', message: 'Category name is required' }],
    itemName: [{ condition: (value) => value !== null && value !== undefined && value !== '', message: 'Item name is required' }],
    weight: [
      { condition: (value) => value !== null && value !== undefined && value !== '', message: 'Weight is required' },
      { condition: (value) => value > 0, message: 'Weight must be a positive number' }
    ],
    rating: [
      { condition: (value) => value !== null && value !== undefined && value !== '', message: 'Rating is required' },
      { condition: (value) => value > 0 && value <= 5, message: 'Rating must be between 1 and 5' }
    ],
    price: [
      { condition: (value) => value !== null && value !== undefined && value !== '', message: 'Price is required' },
      { condition: (value) => value > 0, message: 'Price must be a positive number' }
    ],
    image: [{ condition: (value) => value !== null && value !== undefined && value !== '', message: 'Image URL is required' }],
    color: [{ condition: (value) => value !== null && value !== undefined && value !== '', message: 'Color is required' }],
    origin: [{ condition: (value) => value !== null && value !== undefined && value !== '', message: 'Origin is required' }]
  };  

  const handleCreateCategory = async () => {
    const { isValid, errors } = validate({ name, ...item, itemName: item.name }, validationRules);

    if (isValid) {
      const newCategory = {
        name,
        items: [item]
      };

      try {
        setLoading(true);
        await axios.post(`${BASE_URL}/Categories`, newCategory);
        triggerRefresh();
        navigation.goBack();
      } catch (error) {
        console.error('Error creating category:', error);
        Alert.alert("Error", "An error occurred while creating the category.");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(errors);
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
    }
  };

  const handleInputChange = (key, value) => {
    setItem({
      ...item,
      [key]: key === 'weight' || key === 'rating' || key === 'price' ? (value ? parseFloat(value) : '') : value
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ValidatedInput
        label="Category Name"
        value={name}
        onChange={setName}
        placeholder="Enter category name"
        validationRules={validationRules.name}
      />
      <ValidatedInput
        label="Item Name"
        value={item.name}
        onChange={(text) => handleInputChange('name', text)}
        placeholder="Enter item name"
        validationRules={validationRules.itemName}
      />
      <ValidatedInput
        label="Weight"
        value={item.weight != null ? item.weight.toString() : ''}
        onChange={(text) => handleInputChange('weight', text)}
        placeholder="Enter item weight"
        keyboardType="numeric"
        validationRules={validationRules.weight}
      />
      <ValidatedInput
        label="Rating"
        value={item.rating != null ? item.rating.toString() : ''}
        onChange={(text) => handleInputChange('rating', text)}
        placeholder="Enter item rating"
        keyboardType="numeric"
        validationRules={validationRules.rating}
      />
      <ValidatedInput
        label="Price"
        value={item.price != null ? item.price.toString() : ''}
        onChange={(text) => handleInputChange('price', text)}
        placeholder="Enter item price"
        keyboardType="numeric"
        validationRules={validationRules.price}
      />
      <ValidatedInput
        label="Image URL"
        value={item.image}
        onChange={(text) => handleInputChange('image', text)}
        placeholder="Enter item image URL"
        validationRules={validationRules.image}
      />
      <ValidatedInput
        label="Color"
        value={item.color}
        onChange={(text) => handleInputChange('color', text)}
        placeholder="Enter item color"
        validationRules={validationRules.color}
      />
      <ValidatedInput
        label="Bonus"
        value={item.bonus !== '' ? item.bonus : ''}
        onChange={(text) => handleInputChange('bonus', text)}
        placeholder="Enter item bonus"
      />
      <ValidatedInput
        label="Origin"
        value={item.origin}
        onChange={(text) => handleInputChange('origin', text)}
        placeholder="Enter item origin"
        validationRules={validationRules.origin}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Create Category" onPress={handleCreateCategory} />
      )}
      <View style={styles.block}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  block: {
    height: 30,
  },
});

export default CreateCategoryScreen;