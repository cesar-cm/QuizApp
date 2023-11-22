import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreen} from '../../navigation/NavigationStack';
import {useDispatch} from 'react-redux';
import {fetchSession} from '../../store/redux/states/sessionState';
import configureStore from '../../store/redux/ReduxStore';
import {UserSession} from '../../store/sessionStorage/useSessionStorage';

type AppDispatch = typeof configureStore.dispatch;

const PrimaryScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const f = async () => {
      try {
        const sessionPromise = dispatch(fetchSession());
        sessionPromise.then(value => {
          const session: UserSession = value.payload as UserSession;
          navigation.reset({
            index: 0,
            animation: false,
            routes:
              session.isLoggedIn === true
                ? [{name: NavigationScreen.Home.name}]
                : [{name: NavigationScreen.Login.name}],
          });
        });
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    f();
  }, [dispatch, navigation]);
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default PrimaryScreen;
