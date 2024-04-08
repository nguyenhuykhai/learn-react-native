import { Text, View, Image, StyleSheet } from 'react-native';
import MealDetails from '../components/MealDetails';

import { MEALS } from '../data/dummy-data';

function MealDetailScreen({ route }) {
    const mealId = route.params.mealId;

    const selectMeal = MEALS.find((meal) => meal.id === mealId);

    return (
        <View>
            <Image source={{ uri: selectMeal.imageUrl }} />
            <Text>{selectMeal.title}</Text>
            <MealDetails
                duration={selectMeal.duration}
                complexity={selectMeal.complexity}
                affordability={selectMeal.affordability}
            />
            <Text>Ingredients</Text>
            {selectMeal.ingredients.map((ingredient) => (
                <Text key={ingredient}>{ingredient}</Text>
            ))}
            <Text>Steps</Text>
            {selectMeal.steps.map((step) => (
                <Text key={step}>{step}</Text>
            ))}
        </View>
    )
}

export default MealDetailScreen;