import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AppContext} from '../../store/context/AppContext';
import ModalQuizView from '../../components/ModalQuizView';
import HomeQuizStateView from '../../components/HomeQuizStateView';
import {QuizState} from '../../store/models/Quiz';
// Navigation dependencies
import {StackScreenProps} from '@react-navigation/stack';
import {
  NavigationScreen,
  RootStackParamList,
} from '../../navigation/NavigationStack';
// use redux
import configureStore from '../../store/redux/ReduxStore';
import {useDispatch} from 'react-redux';
import {logOut} from '../../store/redux/states/sessionState';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
type AppDispatch = typeof configureStore.dispatch;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {quiz, fetchQuiz, updateQuizStatus} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => {
            console.log('user did logout');
            dispatch(logOut());
            navigation.reset({
              index: 0,
              routes: [{name: NavigationScreen.Primary.name}],
              animation: false,
            });
          }}>
          <Text style={styles.logOutBtnText}>logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [dispatch, navigation]);

  useEffect(() => {
    if (quiz === undefined) {
      setTimeout(() => {
        fetchQuiz();
      }, 2000);
    }
  });

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleUserInteractionButton = () => {
    if (quiz && quiz.state === QuizState.unStarted) {
      updateQuizStatus(QuizState.inProgress);
    }
    openModal();
  };

  const completeQuizHandler = () => {
    closeModal();
    updateQuizStatus(QuizState.done);
  };

  return (
    <View style={styles.component}>
      {quiz === undefined ? (
        <Text style={styles.loadingLabel}>loading ...</Text>
      ) : (
        <>
          <HomeQuizStateView
            state={quiz?.state ?? QuizState.unStarted}
            action={handleUserInteractionButton}
          />
          <ModalQuizView
            isVisible={modalVisible}
            onClose={closeModal}
            onCompleteQuiz={completeQuizHandler}
            quiz={quiz}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    padding: 16,
  },
  loadingLabel: {
    textAlign: 'center',
    padding: 30,
  },
  modalQuizView: {
    flex: 1,
  },
  logOutBtn: {
    marginRight: 16,
  },
  logOutBtnText: {},
});

export default HomeScreen;
