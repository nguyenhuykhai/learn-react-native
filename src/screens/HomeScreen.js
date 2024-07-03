import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from 'axios';
import { getCategories } from "../api/apiService";
import { useGlobalState } from "../context/GlobalStateContext";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { BASE_URL } from "../api/apiService";

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const { isRefresh, triggerRefresh } = useGlobalState();

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response.data);
    });
  }, [isRefresh]);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${BASE_URL}/Categories/${categoryId}`);
      triggerRefresh();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const confirmDeleteCategory = (categoryId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleDeleteCategory(categoryId)
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Detail", { item, detailItem: item.items[0] })}
      >
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDeleteCategory(item.id)}
      >
        <AntDesign name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.groupbtnContainer}>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btnClickContain}
            onPress={() => navigation.navigate('CreateCategory')}
          >
            <View style={styles.btnContainer}>
              <Text style={styles.title}>CREATE NEW CATEGORY</Text>
              <Ionicons name="create-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  item: {
    flex: 1,
  },
  name: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 10,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 250,
    marginBottom: 10,
    width: Dimensions.get("window").width / 1.5,
    margin: 10,
  },
  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  groupbtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default HomeScreen;
