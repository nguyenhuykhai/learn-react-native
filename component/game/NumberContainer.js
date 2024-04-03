import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

function NumberContainer({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer;

const styles = StyleSheet.create({
    container:{
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 4,
        margin: 24,
        borderRadius: 8,
        alignContent: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 36,
        color: Colors.accent500,
        fontWeight: 'bold', 
    }
})