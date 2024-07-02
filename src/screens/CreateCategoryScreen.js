import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateContext';

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
  const { triggerRefresh } = useGlobalState();

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!name) {
      valid = false;
      errors.name = "Category name is required";
    }
    if (!item.name) {
      valid = false;
      errors.itemName = "Item name is required";
    }
    if (!item.weight || item.weight <= 0) {
      valid = false;
      errors.weight = "Weight must be a positive number";
    }
    if (!item.rating || item.rating <= 0 || item.rating > 5) {
      valid = false;
      errors.rating = "Rating must be between 1 and 5";
    }
    if (!item.price || item.price <= 0) {
      valid = false;
      errors.price = "Price must be a positive number";
    }
    if (!item.image) {
      valid = false;
      errors.image = "Image URL is required";
    }
    if (!item.color) {
      valid = false;
      errors.color = "Color is required";
    }
    if (!item.origin) {
      valid = false;
      errors.origin = "Origin is required";
    }

    setErrors(errors);
    return valid;
  };

  const handleCreateCategory = async () => {
    if (validate()) {
      const newCategory = {
        name,
        items: [item]
      };

      try {
        await axios.post('https://66755190a8d2b4d072ef8980.mockapi.io/Categories', newCategory);
        triggerRefresh();
        navigation.goBack();
      } catch (error) {
        console.error('Error creating category:', error);
      }
    } else {
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Category Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter category name"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        value={item.name}
        onChangeText={(text) => setItem({ ...item, name: text })}
        placeholder="Enter item name"
      />
      {errors.itemName && <Text style={styles.errorText}>{errors.itemName}</Text>}

      <Text style={styles.label}>Weight:</Text>
      <TextInput
        style={styles.input}
        value={item.weight.toString()}
        onChangeText={(text) => setItem({ ...item, weight: parseFloat(text) })}
        placeholder="Enter item weight"
        keyboardType="numeric"
      />
      {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}

      <Text style={styles.label}>Rating:</Text>
      <TextInput
        style={styles.input}
        value={item.rating.toString()}
        onChangeText={(text) => setItem({ ...item, rating: parseFloat(text) })}
        placeholder="Enter item rating"
        keyboardType="numeric"
      />
      {errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={item.price.toString()}
        onChangeText={(text) => setItem({ ...item, price: parseFloat(text) })}
        placeholder="Enter item price"
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={item.image}
        onChangeText={(text) => setItem({ ...item, image: text })}
        placeholder="Enter item image URL"
      />
      {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

      <Text style={styles.label}>Color:</Text>
      <TextInput
        style={styles.input}
        value={item.color}
        onChangeText={(text) => setItem({ ...item, color: text })}
        placeholder="Enter item color"
      />
      {errors.color && <Text style={styles.errorText}>{errors.color}</Text>}

      <Text style={styles.label}>Bonus:</Text>
      <TextInput
        style={styles.input}
        value={item.bonus}
        onChangeText={(text) => setItem({ ...item, bonus: text })}
        placeholder="Enter item bonus"
      />

      <Text style={styles.label}>Origin:</Text>
      <TextInput
        style={styles.input}
        value={item.origin}
        onChangeText={(text) => setItem({ ...item, origin: text })}
        placeholder="Enter item origin"
      />
      {errors.origin && <Text style={styles.errorText}>{errors.origin}</Text>}

      <Button title="Create Category" onPress={handleCreateCategory} />
      <View style={styles.block}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
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

export default CreateCategoryScreen;
