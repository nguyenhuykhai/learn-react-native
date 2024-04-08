import { View, Text, StyleSheet } from 'react-native';

function MealDetails({ duration, complexity, affordability }) {
    return (
        <View style={styles.details}>
            <Text style={styles.detailItems}>{duration}</Text>
            <Text style={styles.detailItems}>{complexity.toUpperCase()}</Text>
            <Text style={styles.detailItems}>{affordability.toUpperCase()}</Text>
        </View>
    )
}

export default MealDetails;

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    detailItems: {
        marginHorizontal: 4,
        fontSize: 12,
    },
});