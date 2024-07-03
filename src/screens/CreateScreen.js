import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateContext';
import ValidatedInput from '../components/ValidatedInput';
import { validate } from '../utils/validation';
import { BASE_URL } from '../api/apiService';

const CreateScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [newOrchid, setNewOrchid] = useState({
    id: category.items.length + 1,
    name: "",
    weight: 0,
    rating: 0,
    price: 0,
    isTopOfTheWeek: false,
    image: "",
    color: "",
    bonus: "",
    origin: "",
    isFavorite: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useGlobalState();

  const validationRules = {
    name: [{ condition: (value) => value !== null && value !== undefined && value !== '', message: 'Name is required' }],
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

  const handleCreateOrchid = async () => {
    const { isValid, errors } = validate(newOrchid, validationRules);

    if (isValid) {
      try {
        const updatedCategory = {
          ...category,
          items: [...category.items, newOrchid],
        };
        const response = await axios.put(`${BASE_URL}/Categories/${category.id}`, updatedCategory);
        if (response.status === 200) {
          triggerRefresh();
          confirmAlert("Success", "Orchid created successfully.");
        } else {
          confirmAlert("Error", "Error updating orchid. Please try again.");
          console.error('Error updating category:', response);
        }
      } catch (error) {
        confirmAlert("Error", "Error creating orchid. Please try again.");
        console.error('Error creating orchid:', error);
      }
    } else {
      setErrors(errors);
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
    }
  };

  const handleInputChange = (key, value) => {
    setNewOrchid({
      ...newOrchid,
      [key]: key === 'weight' || key === 'rating' || key === 'price' ? (value ? parseFloat(value) : '') : value
    });
  };

  const confirmAlert = (header, message) => {
    Alert.alert(
      header,
      message,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ValidatedInput
        label="Name"
        value={newOrchid.name}
        onChange={(text) => handleInputChange('name', text)}
        placeholder="Enter name"
        validationRules={validationRules.name}
      />
      <ValidatedInput
        label="Weight"
        value={newOrchid.weight != null ? newOrchid.weight.toString() : ''}
        onChange={(text) => handleInputChange('weight', text)}
        placeholder="Enter weight"
        keyboardType="numeric"
        validationRules={validationRules.weight}
      />
      <ValidatedInput
        label="Rating"
        value={newOrchid.rating != null ? newOrchid.rating.toString() : ''}
        onChange={(text) => handleInputChange('rating', text)}
        placeholder="Enter rating"
        keyboardType="numeric"
        validationRules={validationRules.rating}
      />
      <ValidatedInput
        label="Price"
        value={newOrchid.price != null ? newOrchid.price.toString() : ''}
        onChange={(text) => handleInputChange('price', text)}
        placeholder="Enter price"
        keyboardType="numeric"
        validationRules={validationRules.price}
      />
      <ValidatedInput
        label="Image URL"
        value={newOrchid.image}
        onChange={(text) => handleInputChange('image', text)}
        placeholder="Enter image URL"
        validationRules={validationRules.image}
      />
      <ValidatedInput
        label="Color"
        value={newOrchid.color}
        onChange={(text) => handleInputChange('color', text)}
        placeholder="Enter color"
        validationRules={validationRules.color}
      />
      <ValidatedInput
        label="Bonus"
        value={newOrchid.bonus != null ? newOrchid.bonus.toString() : ''}
        onChange={(text) => handleInputChange('bonus', text)}
        placeholder="Enter bonus"
      />
      <ValidatedInput
        label="Origin"
        value={newOrchid.origin}
        onChange={(text) => handleInputChange('origin', text)}
        placeholder="Enter origin"
        validationRules={validationRules.origin}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Create Orchid" onPress={handleCreateOrchid} />
      )}
      <View style={styles.block}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  block: {
    height: 30,
  },
});

export default CreateScreen;