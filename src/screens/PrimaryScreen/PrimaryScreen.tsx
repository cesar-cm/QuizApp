import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import useSessionStorage from '../../store/sessionStorage/useSessionStorage';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreen} from '../../navigation/NavigationStack';

const PrimaryScreen: React.FC = () => {
  const sessionStorage = useSessionStorage();
  const navigation = useNavigation();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await sessionStorage.onGetSession();
        console.log('Checking user session:', session);
        if (session?.isLoggedIn === true) {
          navigation.reset({
            index: 0,
            routes: [{name: NavigationScreen.Home.name}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: NavigationScreen.Login.name}],
          });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, [navigation, sessionStorage]);
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default PrimaryScreen;
