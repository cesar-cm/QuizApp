import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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
import {useSelector} from 'react-redux';
import configureStore, {AppStore} from '../../store/redux/ReduxStore';
import {useDispatch} from 'react-redux';
import {logOut} from '../../store/redux/states/sessionState';
import {fetchQuiz, updateQuizStatus} from '../../store/redux/states/quizStore';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
type AppDispatch = typeof configureStore.dispatch;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const quiz = useSelector((state: AppStore) => state.quiz);
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
    if (quiz.questions.length <= 0) {
      setTimeout(() => {
        dispatch(fetchQuiz());
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
      dispatch(updateQuizStatus(QuizState.inProgress));
    }
    openModal();
  };

  const completeQuizHandler = () => {
    closeModal();
    dispatch(updateQuizStatus(QuizState.done));
  };

  return (
    <View style={styles.component}>
      {quiz.questions.length <= 0 ? (
        <Text style={styles.loadingLabel}>loading ...</Text>
      ) : (
        <>
          <HomeQuizStateView
            state={quiz.state}
            action={handleUserInteractionButton}
          />
          <ModalQuizView
            isVisible={modalVisible}
            onClose={closeModal}
            onCompleteQuiz={completeQuizHandler}
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
