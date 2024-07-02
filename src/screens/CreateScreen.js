import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateContext';

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
  const { triggerRefresh } = useGlobalState();

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!newOrchid.name) {
      valid = false;
      errors.name = "Name is required";
    }
    if (!newOrchid.weight || newOrchid.weight <= 0) {
      valid = false;
      errors.weight = "Weight must be a positive number";
    }
    if (!newOrchid.rating || newOrchid.rating <= 0 || newOrchid.rating > 5) {
      valid = false;
      errors.rating = "Rating must be between 1 and 5";
    }
    if (!newOrchid.price || newOrchid.price <= 0) {
      valid = false;
      errors.price = "Price must be a positive number";
    }
    if (!newOrchid.image) {
      valid = false;
      errors.image = "Image URL is required";
    }
    if (!newOrchid.color) {
      valid = false;
      errors.color = "Color is required";
    }
    if (!newOrchid.origin) {
      valid = false;
      errors.origin = "Origin is required";
    }

    setErrors(errors);
    return valid;
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

  const handleCreateOrchid = async () => {
    if (validate()) {
      try {
        const updatedCategory = {
          ...category,
          items: [...category.items, newOrchid],
        };
        const response = await axios.put(`https://66755190a8d2b4d072ef8980.mockapi.io/Categories/${category.id}`, updatedCategory);
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
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Name"
        value={newOrchid.name}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, name: text })}
        style={styles.input}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <TextInput
        placeholder="Weight"
        value={newOrchid.weight.toString()}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, weight: parseFloat(text) })}
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
      <TextInput
        placeholder="Rating"
        value={newOrchid.rating.toString()}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, rating: parseFloat(text) })}
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
      <TextInput
        placeholder="Price"
        value={newOrchid.price.toString()}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, price: parseFloat(text) })}
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
      <TextInput
        placeholder="Image URL"
        value={newOrchid.image}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, image: text })}
        style={styles.input}
      />
      {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
      <TextInput
        placeholder="Color"
        value={newOrchid.color}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, color: text })}
        style={styles.input}
      />
      {errors.color && <Text style={styles.errorText}>{errors.color}</Text>}
      <TextInput
        placeholder="Bonus"
        value={newOrchid.bonus}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, bonus: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Origin"
        value={newOrchid.origin}
        onChangeText={(text) => setNewOrchid({ ...newOrchid, origin: text })}
        style={styles.input}
      />
      {errors.origin && <Text style={styles.errorText}>{errors.origin}</Text>}
      <Button title="Create Orchid" onPress={handleCreateOrchid} />
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
