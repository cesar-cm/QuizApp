import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import ButtonApp from '../../components/ButtonApp';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../constants/UIKit';
import {NavigationScreen} from '../../navigation/NavigationStack';
// use redux
import configureStore from '../../store/redux/ReduxStore';
import {useDispatch} from 'react-redux';
import {logIn} from '../../store/redux/states/sessionState';
type AppDispatch = typeof configureStore.dispatch;

const LogInScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUserNameInput = (text: string) => {
    setUser(text);
  };

  const handlePasswordInput = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {
    if (user === 'adminUser' && password === '12345678') {
      console.log('User did login');
      dispatch(logIn());
      navigation.reset({
        index: 0,
        routes: [{name: NavigationScreen.Home.name}],
      });
    } else {
      Alert.alert('', 'incorrect user or password', [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.component}>
        <Text style={styles.title}>MyQuizApp</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={text => handleUserNameInput(text)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="user name / email"
        />
        <TextInput
          style={styles.inputText}
          onChangeText={text => handlePasswordInput(text)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="password"
          textContentType="password"
          secureTextEntry={true}
        />
        <ButtonApp
          title="Go"
          action={handleLogin}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 0.8,
    justifyContent: 'center',
  },
  title: {
    fontSize: Fonts.size.largeTitle,
    textAlign: 'center',
    marginVertical: 20,
  },
  component: {
    padding: 20,
  },
  button: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
  },
  inputText: {
    borderWidth: 1,
    padding: 5,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default LogInScreen;
