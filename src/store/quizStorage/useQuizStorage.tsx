import AsyncStorage from '@react-native-async-storage/async-storage';
import {Quiz} from '../models/Quiz';

const MY_Quiz_KEY = '@MyQuiz:Key';

const useQuizStorage = () => {
  const handleSaveQuiz = async ({questions, state}: Quiz) => {
    try {
      await AsyncStorage.setItem(
        MY_Quiz_KEY,
        JSON.stringify({questions, state}),
      );
      return Promise.resolve('Success');
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleGetQuiz = async (): Promise<Quiz | undefined> => {
    try {
      const currentQuiz = await AsyncStorage.getItem(MY_Quiz_KEY);
      if (currentQuiz !== null) {
        const currentQuizParsed: Quiz = JSON.parse(currentQuiz) as Quiz;
        return Promise.resolve(currentQuizParsed);
      } else {
        return Promise.reject();
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  return {
    onSaveQuiz: handleSaveQuiz,
    onGetQuiz: handleGetQuiz,
  };
};

export default useQuizStorage;
