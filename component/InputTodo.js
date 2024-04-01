import { useState } from "react"
import { StyleSheet, View, TextInput, Button } from "react-native"

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
        <View style={styles.inputContainer}>
            <TextInput style={{ width: '70%', padding: 8, marginRight: 2, borderWidth: 1, borderColor: '#cccccc' }} value={enterText} placeholder='Input your todo list' onChangeText={handleExterText} />
            <Button title='Add Todo' onPress={handleAddTodo} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
    }
})
