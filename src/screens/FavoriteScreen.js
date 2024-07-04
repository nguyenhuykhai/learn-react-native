import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import OrchidFavoriteItem from "../components/OrchidFavoriteItem";
import { useGlobalState } from "../context/GlobalStateContext";
import { getCategories } from "../api/apiService";
import { BASE_URL } from "../api/apiService";

const FavoriteScreen = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isRefresh, triggerRefresh } = useGlobalState();

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response.data);
      loadFavorites(response.data);
    });
  }, [isRefresh]);

  const loadFavorites = async (categories) => {
    try {
      const favoriteIds = await AsyncStorage.getItem("favorites");
      if (favoriteIds) {
        const favoriteIdsArray = JSON.parse(favoriteIds);
        const favoriteItems = categories.reduce((acc, category) => {
          const items = category.items.filter((item) =>
            favoriteIdsArray.includes(item.id)
          );
          return [...acc, ...items];
        }, []);
        setFavorites(favoriteItems);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites from AsyncStorage:", error);
    }
  };

  const saveFavorites = async (favoriteIds) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(favoriteIds));
      triggerRefresh();
    } catch (error) {
      console.error("Error saving favorites to AsyncStorage:", error);
    }
  };

  const toggleFavorite = async (orchid) => {
    try {
      const favoriteIds = await AsyncStorage.getItem("favorites");
      let favoriteIdsArray = favoriteIds ? JSON.parse(favoriteIds) : [];
      if (favoriteIdsArray.includes(orchid.id)) {
        favoriteIdsArray = favoriteIdsArray.filter((id) => id !== orchid.id);
      } else {
        favoriteIdsArray.push(orchid.id);
      }
      await saveFavorites(favoriteIdsArray);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const confirmToggleFavorite = (orchid) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this orchid from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => toggleFavorite(orchid),
        },
      ]
    );
  };

  if (favorites.length === 0) {
    return <Text>No favorites added yet</Text>;
  }

  return (
    <FlatList
      data={favorites}
      renderItem={({ item, index }) => (
        <OrchidFavoriteItem
          categories={categories}
          item={item}
          onToggleFavorite={() => confirmToggleFavorite(item)}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default FavoriteScreen;