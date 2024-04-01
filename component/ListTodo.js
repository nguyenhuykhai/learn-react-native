import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function ListTodo(props) {
    return (
        <Pressable onPress={props.onDeleteTodo.bind(this, props.id)}>
            <View style={styles.itemTodo}>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemTodo: {
        marginTop: 10,
        padding: 10,
        height: 44,
        backgroundColor: '#0081f1',
        borderRadius: 5,
    },
    itemText: {
        color: '#ffffff',
    }
});
