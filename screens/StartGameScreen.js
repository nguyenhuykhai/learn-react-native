import { useState } from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    Alert,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import PrimaryButton from '../component/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../component/ui/Title';
import Card from '../component/ui/Card';
import InstructionText from '../component/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
    const [enteredValue, setEnteredValue] = useState('');

    const { width, height } = useWindowDimensions();

    function numberInputHandler(enterText) {
        setEnteredValue(enterText.nativeEvent.text);
    }

    function resetInutHandler() {
        setEnteredValue('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.prompt(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInutHandler }]);
            return;
        }

        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card style={styles.inputContainer}>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            onChange={(e) => numberInputHandler(e)}
                            autoCorrect={false}
                            value={enteredValue}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInutHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
})