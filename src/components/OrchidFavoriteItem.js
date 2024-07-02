import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const OrchidFavoriteItem = ({ categories, item, onToggleFavorite, navigation }) => {
  const [selectCategory, setSelectCategory] = useState(null);
  const handleSelectCategory = (category) => {
    categories.forEach(categoryItem => {
      categoryItem.items.forEach(item => {
        if (item.id === category.id) {
          setSelectCategory(categoryItem);
          navigation.navigate('Detail', { item: categoryItem, detailItem: category });
        }
      });
    });
    // navigation.navigate('Detail', { item, detailItem: item.items[0] })}
  }

  return (
    <TouchableOpacity onPress={() => handleSelectCategory(item)}>
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.btnClickContain} >
          <View
            style={styles.btnContainer}>
            <MaterialIcons name={item.isFavorite ? "favorite" : "favorite-border"} size={24} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    alignSelf: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 250,
    marginBottom: 10,
    width: 50,
    marginLeft: 10,
  },
  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default OrchidFavoriteItem;
