import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';

/*
Import Icon
*/
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import UpdateScreen from '../screens/UpdateScreen';
import CreateScreen from '../screens/CreateScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
    <Stack.Screen name="Update" component={UpdateScreen} />
    <Stack.Screen name="Create" component={CreateScreen} />
    <Stack.Screen name="CreateCategory" component={CreateCategoryScreen} />
  </Stack.Navigator>
);

const FavoriteStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favorite" component={FavoriteScreen} />
    {/* <Stack.Screen name="Detail" component={DetailScreen} />
    <Stack.Screen name="Update" component={UpdateScreen} />
    <Stack.Screen name="Create" component={CreateScreen} /> */}
  </Stack.Navigator>
);

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
        name="Home Page"
        component={HomeStack} />
        <Tab.Screen 
        options={{
          tabBarIcon: () => <MaterialIcons name="favorite-border" size={24} color="black" />,
        }}
        name="My Favorite" component={FavoriteStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
