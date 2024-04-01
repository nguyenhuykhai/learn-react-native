import { useState } from "react"
import { StyleSheet, View, TextInput, Button, Modal } from "react-native"

export default function InputTodo(props) {
    const [enterText, setEnterText] = useState('');

    // Handle add new todo
    function handleAddTodo() {
        props.onAddTodo(enterText);
        setEnterText('');
    }

    // Two-way binding
    function handleExterText(enterText) {
        setEnterText(enterText);
    }

    return (
        <Modal visible={props.visible} animationType="fade">
            <View style={styles.inputContainer}>
                <TextInput style={{ width: '70%', padding: 8, marginRight: 2, borderWidth: 1, borderColor: '#cccccc' }} value={enterText} placeholder='Input your todo list' onChangeText={handleExterText} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Add Todo' onPress={handleAddTodo} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' color="red" onPress={props.cancelAddTodo} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        width: "30%",
        paddingHorizontal: 10,
    }
})
