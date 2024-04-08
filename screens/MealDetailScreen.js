import { useLayoutEffect } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Button } from 'react-native';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/Subtitle';
import List from '../components/List';
import IconButton from '../components/IconButton';

import { MEALS } from '../data/dummy-data';

function MealDetailScreen({ route, navigation }) {
    const mealId = route.params.mealId;

    const selectMeal = MEALS.find((meal) => meal.id === mealId);

    function headerButtonPressHandler() {
        console.log('Header button pressed');
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="heart" color="#cccccc" onPress={headerButtonPressHandler} />
        });
    }, [navigation, headerButtonPressHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectMeal.imageUrl }} />
            <Text style={styles.title} >{selectMeal.title}</Text>
            <MealDetails
                duration={selectMeal.duration}
                complexity={selectMeal.complexity}
                affordability={selectMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectMeal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 8,
        textAlign: 'center',
        color: '#cccccc'
    },
    detailText: {
        color: '#cccccc'
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%'
    }
});