import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import OrchidItem from "../components/OrchildItem";
import { useGlobalState } from "../context/GlobalStateContext";
import axios from "axios";
import { BASE_URL } from "../api/apiService";

const DetailScreen = ({ route, navigation }) => {
  const { item, detailItem } = route.params;
  const [selectItem, setSelectItem] = useState(null);
  const [originalData, setOrginalData] = useState(null);
  const { isRefresh, triggerRefresh } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const [listFavorites, setListFavorites] = useState([]);

  useEffect(() => {
    setSelectItem(detailItem);
    setOrginalData(item);
    loadFavorites(detailItem);
  }, [item, detailItem]);

  const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        setListFavorites(JSON.parse(favorites));
      } else {
        setListFavorites([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading favorites from AsyncStorage:", error);
    }
  };

  const saveFavorites = async (favoriteIds) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(favoriteIds));
      setListFavorites(favoriteIds);
    } catch (error) {
      console.error("Error saving favorites to AsyncStorage:", error);
    }
  };

  const toggleFavorite = (orchid) => {
    let updatedFavorites;
    if (listFavorites.includes(orchid.id)) {
      updatedFavorites = listFavorites.filter(id => id !== orchid.id);
    } else {
      updatedFavorites = [...listFavorites, orchid.id];
    }
    saveFavorites(updatedFavorites);
    triggerRefresh();
  };

  const confirmDeleteOrchid = (orchidId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this orchid?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleDeleteOrchid(orchidId),
        },
      ]
    );
  };

  const handleDeleteOrchid = async (orchidId) => {
    try {
      const updatedCategory = {
        ...item,
        items: item.items.filter((orchid) => orchid.id !== orchidId),
      };
      await axios.put(
        `${BASE_URL}/Categories/${item.id}`,
        updatedCategory
      );
      // Remove from AsyncStorage
      const newFavorites = listFavorites.filter((id) => id !== orchidId);
      saveFavorites(newFavorites);
      item.items = item.items.filter((orchid) => orchid.id !== orchidId);
      setSelectItem(item.items[0] || null);
      triggerRefresh();
    } catch (error) {
      console.error("Error deleting orchid:", error);
    }
  };

  const handleSelectItem = (item) => {
    setSelectItem(item);
    loadFavorites();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.groupbtnContainer}>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => confirmDeleteOrchid(selectItem.id)}
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <AntDesign name="delete" size={20} color="red" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Update", {
                    item: selectItem,
                    category: item,
                  })
                }
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <Ionicons name="create-outline" size={24} color="blue" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Create", { category: item })
                }
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <AntDesign name="pluscircleo" size={20} color="blue" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => toggleFavorite(selectItem)}
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <MaterialIcons
                    name={ listFavorites.includes(selectItem.id) ? "favorite" : "favorite-outline"}
                    size={24}
                    color="red"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={{ uri: selectItem.image }} style={styles.image} />
          <Text style={styles.name}>{selectItem.name}</Text>
          <Text style={styles.details}>Origin: {selectItem.origin}</Text>
          <Text style={styles.details}>Rating: {selectItem.rating}</Text>
          <Text style={styles.details}>Price: ${selectItem.price}</Text>
        </View>
      }
      data={item.items}
      renderItem={({ item }) => (
        <OrchidItem
          item={item}
          setSelectItem={handleSelectItem}
          onDelete={() => confirmDeleteOrchid(item.id)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  details: {
    fontSize: 18,
    marginVertical: 5,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    alignSelf: "center",
  },
  btnClickContain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    alignSelf: "stretch",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 250,
    marginBottom: 10,
    width: 50,
    marginLeft: 10,
  },
  groupbtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

export default DetailScreen;