import { useContext, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Image, ScrollView, StyleSheet, Button } from 'react-native';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/Subtitle';
import List from '../components/List';
import IconButton from '../components/IconButton';
import { MEALS } from '../data/dummy-data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();

    const mealId = route.params.mealId;

    const selectMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavorite = favoriteMealIds.includes(mealId);

    function changeFavoritesStatusHandler() {
        if (mealIsFavorite) {
            dispatch(removeFavorite({ id: mealId }));
        } else {
            dispatch(addFavorite({ id: mealId }));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton
                        icon={mealIsFavorite ? 'star' : 'star-outline'}
                        color="#cccccc"
                        onPress={changeFavoritesStatusHandler}
                    />
                )
            }
        });
    }, [navigation, changeFavoritesStatusHandler]);

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