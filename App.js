import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [todo, setTodo] = useState([]);
  const [enterText, setEnterText] = useState('');

  function handleExterText(enterText) {
    setEnterText(enterText);
  }

  function handleAddTodo() {
    setTodo(todo => [...todo, enterText]);
    setEnterText('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={{ width: '70%', padding: 8, marginRight: 2, borderWidth: 1, borderColor: '#cccccc' }} value={enterText} placeholder='Input your todo list' onChangeText={handleExterText}/>
        <Button title='Add Todo' onPress={handleAddTodo}/>
      </View>
      <View style={styles.listContainer}>
        <Text style={{ paddingBottom:10, borderBottomWidth:2, borderBottomColor: '#cccccc' }}>Todo list...</Text>
        {todo.map((item, index) => (
            <Text key={index} style={styles.itemTodo}>{item}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  listContainer: {
    marginVertical: 10,
  },
  itemTodo: {
    paddingTop: 10,
    height: 44,
  },
});
