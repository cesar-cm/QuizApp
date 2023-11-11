import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LogInScreen from '../screens/LogInScreen';
import HomeScreen from '../screens/HomeScreen';
import PrimaryScreen from '../screens/PrimaryScreen';

export interface RootStackParamList {
  Home: undefined;
  LogIn: undefined;
  Primary: undefined;
}

export const NavigationScreen = {
  Login: {name: 'LogIn', key: 'LogIn', component: LogInScreen},
  Home: {name: 'Home', key: 'Home', component: HomeScreen},
  Primary: {name: 'Primary', key: 'Primary', component: PrimaryScreen},
};

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={NavigationScreen.Primary.name}
          key={NavigationScreen.Primary.key}
          component={NavigationScreen.Primary.component}
        />
        <Stack.Screen
          name={NavigationScreen.Login.name}
          key={NavigationScreen.Login.key}
          component={NavigationScreen.Login.component}
        />
        <Stack.Screen
          name={NavigationScreen.Home.name}
          key={NavigationScreen.Home.key}
          component={NavigationScreen.Home.component}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
