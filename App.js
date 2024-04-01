import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import ListTodo from './component/ListTodo';
import InputTodo from './component/InputTodo';

export default function App() {
  const [todo, setTodo] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  function startAddTodoHandler() {
    setIsAddMode(true);
  }

  function cancelAddTodoHandler() {
    setIsAddMode(false);
  }

  function handleAddTodo(enterText) {
    setTodo(todo => [...todo, { id: Math.random().toString(), text: enterText }]);
    setIsAddMode(false);
  }

  function handleDeleteItem(id) {
    setTodo(todo => {
      return todo.filter(item => item.id !== id);
    });
  }

  return (
    <View style={styles.container}>
      <Button title='Add Todo' color="#3340F2" onPress={startAddTodoHandler}/>
      <InputTodo visible={isAddMode} cancelAddTodo={cancelAddTodoHandler} onAddTodo={handleAddTodo} />
      <View style={styles.listContainer}>
        <Text style={{ paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: '#cccccc' }}>Todo list...</Text>
        <FlatList data={todo} renderItem={(itemData) => {
          return (
            <ListTodo id={itemData.item.id} text={itemData.item.text} onDeleteTodo={handleDeleteItem}/>
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
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  listContainer: {
    marginVertical: 10,
  }
});
