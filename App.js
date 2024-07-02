import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "./src/components/Header";
import BottomTabs from "./src/navigation/BottomTabs";
import { GlobalStateProvider } from "./src/context/GlobalStateContext";

const App = () => {
  return (
    <GlobalStateProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <BottomTabs />
      </SafeAreaView>
    </GlobalStateProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
