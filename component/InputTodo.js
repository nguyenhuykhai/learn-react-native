import { useState } from "react"
import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native"

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
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image source={require('../assets/images/todo.png')} style={styles.image} />
                <TextInput style={styles.input} value={enterText} placeholder='Input your todo list' onChangeText={handleExterText} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Cancel' color="red" onPress={props.cancelAddTodo} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Add Todo' color="#3340F2" onPress={handleAddTodo} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F2CB33'
    },
    input: {
        backgroundColor: '#ecd162',
        width: '70%',
        padding: 16,
        color: '#9D8E55',
        borderWidth: 2,
        borderColor: '#9D8E55',
        borderRadius: 10,
    },
    image: {
        height: 122,
        width: 150,
        padding: 20,
        margin: 20,
        objectFit: 'cover',
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
