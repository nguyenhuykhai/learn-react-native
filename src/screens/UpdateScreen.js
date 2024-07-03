import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateContext';
import ValidatedInput from '../components/ValidatedInput';
import { validate } from '../utils/validation';
import { BASE_URL } from '../api/apiService';

const UpdateScreen = ({ route, navigation }) => {
  const { item, category } = route.params;
  const [updatedOrchid, setUpdatedOrchid] = useState(item);
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

  const handleUpdateOrchid = async () => {
    const { isValid, errors } = validate(updatedOrchid, validationRules);

    if (isValid) {
      try {
        const updateCategory = {
          ...category,
          items: category.items.map(orchid => (orchid.id === updatedOrchid.id ? updatedOrchid : orchid)),
        };
        const response = await axios.put(`${BASE_URL}/Categories/${updateCategory.id}`, updateCategory);
        if (response.status === 200) {
          triggerRefresh();
          confirmAlert(
            "Orchid Updated",
            "Orchid has been updated successfully."
          );
        } else {
          confirmAlert("Error", "Error updating orchid. Please try again.");
          console.error('Error updating orchid:', response);
        }
      } catch (error) {
        confirmAlert("Error", "Error updating orchid. Please try again.");
        console.error('Error updating orchid:', error);
      }
    } else {
      setErrors(errors);
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
    }
  };

  const handleInputChange = (key, value) => {
    setUpdatedOrchid({
      ...updatedOrchid,
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
        value={updatedOrchid.name}
        onChange={(text) => handleInputChange('name', text)}
        placeholder="Enter name"
        validationRules={validationRules.name}
      />
      <ValidatedInput
        label="Weight"
        value={updatedOrchid.weight != null ? updatedOrchid.weight.toString() : ''}
        onChange={(text) => handleInputChange('weight', text)}
        placeholder="Enter weight"
        keyboardType="numeric"
        validationRules={validationRules.weight}
      />
      <ValidatedInput
        label="Rating"
        value={updatedOrchid.rating != null ? updatedOrchid.rating.toString() : ''}
        onChange={(text) => handleInputChange('rating', text)}
        placeholder="Enter rating"
        keyboardType="numeric"
        validationRules={validationRules.rating}
      />
      <ValidatedInput
        label="Price"
        value={updatedOrchid.price != null ? updatedOrchid.price.toString() : ''}
        onChange={(text) => handleInputChange('price', text)}
        placeholder="Enter price"
        keyboardType="numeric"
        validationRules={validationRules.price}
      />
      <ValidatedInput
        label="Image URL"
        value={updatedOrchid.image}
        onChange={(text) => handleInputChange('image', text)}
        placeholder="Enter image URL"
        validationRules={validationRules.image}
      />
      <ValidatedInput
        label="Color"
        value={updatedOrchid.color}
        onChange={(text) => handleInputChange('color', text)}
        placeholder="Enter color"
        validationRules={validationRules.color}
      />
      <ValidatedInput
        label="Bonus"
        value={updatedOrchid.bonus != null ? updatedOrchid.bonus.toString() : ''}
        onChange={(text) => handleInputChange('bonus', text)}
        placeholder="Enter bonus"
      />
      <ValidatedInput
        label="Origin"
        value={updatedOrchid.origin}
        onChange={(text) => handleInputChange('origin', text)}
        placeholder="Enter origin"
        validationRules={validationRules.origin}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Update Orchid" onPress={handleUpdateOrchid} />
      )}
      <View style={styles.block}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    paddingBottom: 30,
  },
});

export default UpdateScreen;