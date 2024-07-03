import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import OrchidFavoriteItem from '../components/OrchidFavoriteItem';
import { useGlobalState } from '../context/GlobalStateContext';
import { getCategories } from '../api/apiService';
import { BASE_URL } from '../api/apiService';

const FavoriteScreen = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isRefresh, triggerRefresh } = useGlobalState();

  useEffect(() => {
    getCategories().then(response => {
      setCategories(response.data);
      handleGetFavorites(response.data);
    });
  }, [isRefresh]);

  const toggleFavorite = async (orchid) => {
    const updatedOrchid = { ...orchid, isFavorite: !orchid.isFavorite };
    const selectCategory = categories.find(category => category.items.some(item => item.id === updatedOrchid.id));
    const updatedItems = selectCategory.items.map(item =>
      item.id === updatedOrchid.id ? updatedOrchid : item
    );

    try {
      await axios.put(`${BASE_URL}/Categories/${selectCategory.id}`, {
        ...selectCategory,
        items: updatedItems
      });
      triggerRefresh();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleGetFavorites = (categories) => {
    const favorites = categories.reduce((acc, category) => {
      const items = category.items.filter(item => item.isFavorite);
      return [...acc, ...items];
    }, []);
    setFavorites(favorites);
  };

  const confirmToggleFavorite = (orchid) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this orchid from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => toggleFavorite(orchid)
        }
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
