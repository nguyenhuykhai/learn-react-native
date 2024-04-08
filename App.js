import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator  } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverViewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return <Drawer.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#642b0b',
      },
      headerTintColor: '#cccccc',
      sceneContainerStyle: { backgroundColor: '#3f2f25' },
      drawerContentStyle: { backgroundColor: '#3f2f25' },
      drawerInactiveTintColor: '#cccccc',
      drawerActiveTintColor: '#e4baa1'
    }}
  >
    <Drawer.Screen
      name='Categories'
      component={CategoriesScreen}
      options={{
        title: 'All Categories',
        drawerIcon: ({ color, size }) => (
          <Ionicons name='list' color={color} size={size} />
        )
      }}
    />
    <Drawer.Screen
      name='Favorites'
      component={FavoritesScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name='star' color={color} size={size} />
        )
      }}
    />
  </Drawer.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#642b0b',
          },
          headerTintColor: '#cccccc',
          contentStyle: { backgroundColor: '#3f2f25' }
        }}>
          <Stack.Screen
            name='Drawer'
            component={DrawerNavigator}
            options={{
              headerShown: false
            }} />
          <Stack.Screen
            name='MealsOverview'
            component={MealsOverviewScreen}
          />
          <Stack.Screen
            name='MealsDetail'
            component={MealDetailScreen}
            options={{
              title: 'About the Meal'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
