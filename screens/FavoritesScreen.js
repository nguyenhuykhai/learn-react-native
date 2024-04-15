import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MealsList from '../components/MealsList/MealList';
import { MEALS } from '../data/dummy-data';

function FavoritesScreen() {
  const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);

  const favoriteMeals = MEALS.filter(meal => favoriteMealIds.includes(meal.id));

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return <View style={styles.rootContainer}>
      <Text style={styles.text}>No favorite meals found. Start adding some! </Text>
    </View>
  }

  return (
    <MealsList items={favoriteMeals} />
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#cccccc',
    padding: 8
  }
});