import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateContext';

const UpdateScreen = ({ route, navigation }) => {
  const { item, category } = route.params;
  const [updatedOrchid, setUpdatedOrchid] = useState(item);
  const [errors, setErrors] = useState({});
  const { triggerRefresh } = useGlobalState();

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!updatedOrchid.name) {
      valid = false;
      errors.name = "Name is required";
    }
    if (!updatedOrchid.weight || updatedOrchid.weight <= 0) {
      valid = false;
      errors.weight = "Weight must be a positive number";
    }
    if (!updatedOrchid.rating || updatedOrchid.rating <= 0 || updatedOrchid.rating > 5) {
      valid = false;
      errors.rating = "Rating must be between 1 and 5";
    }
    if (!updatedOrchid.price || updatedOrchid.price <= 0) {
      valid = false;
      errors.price = "Price must be a positive number";
    }
    if (!updatedOrchid.image) {
      valid = false;
      errors.image = "Image URL is required";
    }
    if (!updatedOrchid.color) {
      valid = false;
      errors.color = "Color is required";
    }
    if (!updatedOrchid.origin) {
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

  const handleUpdateOrchid = async () => {
    if (validate()) {
      try {
        const updateCategory = {
          ...category,
          items: category.items.map(orchid => (orchid.id === updatedOrchid.id ? updatedOrchid : orchid)),
        };
        const response = await axios.put(`https://66755190a8d2b4d072ef8980.mockapi.io/Categories/${updateCategory.id}`, updateCategory);
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
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={updatedOrchid.name}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, name: text })}
        style={styles.input}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <TextInput
        placeholder="Weight"
        value={updatedOrchid.weight.toString()}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, weight: parseFloat(text) })}
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
      <TextInput
        placeholder="Rating"
        value={updatedOrchid.rating.toString()}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, rating: parseFloat(text) })}
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
      <TextInput
        placeholder="Price"
        value={updatedOrchid.price.toString()}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, price: parseFloat(text) })}
        style={styles.input}
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
      <TextInput
        placeholder="Image URL"
        value={updatedOrchid.image}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, image: text })}
        style={styles.input}
      />
      {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
      <TextInput
        placeholder="Color"
        value={updatedOrchid.color}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, color: text })}
        style={styles.input}
      />
      {errors.color && <Text style={styles.errorText}>{errors.color}</Text>}
      <TextInput
        placeholder="Bonus"
        value={updatedOrchid.bonus}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, bonus: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Origin"
        value={updatedOrchid.origin}
        onChangeText={(text) => setUpdatedOrchid({ ...updatedOrchid, origin: text })}
        style={styles.input}
      />
      {errors.origin && <Text style={styles.errorText}>{errors.origin}</Text>}
      <Button title="Update Orchid" onPress={handleUpdateOrchid} />
    </View>
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
});

export default UpdateScreen;
