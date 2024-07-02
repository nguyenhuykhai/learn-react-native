import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import OrchidItem from "../components/OrchildItem";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useGlobalState } from "../context/GlobalStateContext";

const DetailScreen = ({ route, navigation }) => {
  const { item, detailItem } = route.params;
  const [selectItem, setSelectItem] = useState(null);
  const [originalData, setOrginalData] = useState(null);
  const { triggerRefresh } = useGlobalState();

  useEffect(() => {
    setSelectItem(detailItem);
    setOrginalData(item);
  }, [item, detailItem]);

  const handleDeleteOrchid = async (orchidId) => {
    try {
      const updateCategory = {
        ...item,
        items: item.items.filter((orchid) => orchid.id !== orchidId),
      };
      await axios.put(
        `https://66755190a8d2b4d072ef8980.mockapi.io/Categories/${item.id}`,
        updateCategory
      );
      item.items = item.items.filter((orchid) => orchid.id !== orchidId);
      setSelectItem(item.items[0] || null);
      triggerRefresh();
    } catch (error) {
      console.error("Error deleting orchid:", error);
    }
  };

  const toggleFavorite = async (orchid) => {
    const updateOrginalData = {
      ...originalData,
      items: originalData.items.map((item) => {
        if (item.id === orchid.id) {
          return { ...item, isFavorite: !item.isFavorite };
        } else {
          return item;
        }
      }),
    };
    const updatedOrchid = { ...orchid, isFavorite: !orchid.isFavorite };
    try {
      await axios.put(
        `https://66755190a8d2b4d072ef8980.mockapi.io/Categories/${item.id}`,
        updateOrginalData
      );
      setSelectItem(updatedOrchid);
      setOrginalData(updateOrginalData);
      triggerRefresh();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
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

  if (!selectItem) {
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
                    name={
                      selectItem.isFavorite ? "favorite" : "favorite-outline"
                    }
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
          setSelectItem={setSelectItem}
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
