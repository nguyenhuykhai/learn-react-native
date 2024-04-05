import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({children}) {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, // Shadow on Android
        shadowColor: 'black', // Shadow on iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow on iOS
        shadowRadius: 6, // Shadow on iOS
        shadowOpacity: 0.25, // Shadow on iOS
    }
})