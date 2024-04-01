import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [todo, setTodo] = useState([]);
  const [enterText, setEnterText] = useState('');

  function handleExterText(enterText) {
    setEnterText(enterText);
  }

  function handleAddTodo() {
    setTodo(todo => [...todo, { id: Math.random().toString(), text: enterText }]);
    // setEnterText('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={{ width: '70%', padding: 8, marginRight: 2, borderWidth: 1, borderColor: '#cccccc' }} value={enterText} placeholder='Input your todo list' onChangeText={handleExterText} />
        <Button title='Add Todo' onPress={handleAddTodo} />
      </View>
      <View style={styles.listContainer}>
        <Text style={{ paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: '#cccccc' }}>Todo list...</Text>
        <FlatList data={todo} renderItem={(itemData) => {
          return (
            <View style={styles.itemTodo}>
              <Text style={styles.itemText}>{itemData.item.text}</Text>
            </View>
          )
        }}
          alwaysBounceVertical={false}
          keyExtractor={(item) => item.id}
        />
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
