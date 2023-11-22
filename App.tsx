import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigation from './src/navigation/NavigationStack';
import {Colors} from './src/constants/UIKit';
import {Provider} from 'react-redux';
import ReduxStore from './src/store/redux/ReduxStore';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Provider store={ReduxStore}>
        <AppNavigation />
      </Provider>
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
