import { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ListTodo from './component/ListTodo';
import InputTodo from './component/InputTodo';

import StartGameScreen from './screens/StartGameScreen';

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
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
