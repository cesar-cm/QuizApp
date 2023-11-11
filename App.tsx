import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigation from './src/navigation/NavigationStack';
import {Colors} from './src/constants/UIKit';
import AppContextProvider from './src/store/context/AppContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppContextProvider>
        <AppNavigation />
      </AppContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  app: {
    flex: 1,
  },
});

export default App;
