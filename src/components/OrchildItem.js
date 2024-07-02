import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
// Import icons
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const OrchidItem = ({ item, setSelectItem, onDelete }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => setSelectItem(item)}>
        <View style={styles.itemContent}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </TouchableOpacity>

      {/* Delete btn */}
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.btnClickContain} >
          <View
            style={styles.btnContainer}>
            <AntDesign name="delete" size={20} color="red" />
          </View>
        </TouchableOpacity>
      </View>

    </View>
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

export default OrchidItem;
