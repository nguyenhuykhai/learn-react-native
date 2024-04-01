import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function ListTodo(props) {
    return (
        <View style={styles.itemTodo}>
            <Pressable
                android_ripple={{ color: '#024c8e' }}
                onPress={props.onDeleteTodo.bind(this, props.id)}
                style={({ pressed }) => pressed && styles.pressed }
            >
                <Text style={styles.itemText}>{props.text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    itemTodo: {
        marginTop: 10,
        height: 44,
        backgroundColor: '#3340F2',
        borderRadius: 5,
    },
    itemText: {
        color: '#ffffff',
        padding: 10,
    },
    pressed: {
        opacity: 0.5,
    }
});
