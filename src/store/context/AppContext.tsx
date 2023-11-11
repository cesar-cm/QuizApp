import React, {ReactNode, createContext, useState} from 'react';
import {Quiz, QuizState} from '../models/Quiz';
import {Question} from '../models/Question';
import {HttpClient} from '../../client/HttpClient';
import useSessionStorage from '../sessionStorage/useSessionStorage';

export interface AppContextProps {
  loggedIn: boolean;
  quiz?: Quiz;
  setUserLoggedIn: (isLoggedIn: boolean) => void;
  updateQuizStatus: (newState: QuizState) => void;
  updateQuestion: (question: Question) => void;
  fetchQuiz: () => Promise<void>;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextProps>({
  loggedIn: false,
  quiz: undefined,
  setUserLoggedIn: () => {},
  updateQuizStatus: () => {},
  updateQuestion: () => {},
  fetchQuiz: () => Promise.resolve(),
});

const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  const sessionStorage = useSessionStorage();

  const setUserLoggedInHandler: AppContextProps['setUserLoggedIn'] = (
    isLoggedIn: boolean,
  ) => {
    setLoggedIn(isLoggedIn);
    sessionStorage.onSaveSession(isLoggedIn);
  };

  const updateQuizStatusHandler: AppContextProps['updateQuizStatus'] = (
    newState: QuizState,
  ) => {
    if (quiz && quiz.state !== newState) {
      setQuiz({...quiz, state: newState});
    }
  };

  const updateQuestionHandler: AppContextProps['updateQuestion'] = (
    question: Question,
  ) => {
    if (quiz && quiz.questions.length > 0) {
      const newQuestions: Question[] = quiz.questions.map(q => {
        if (q.id === question.id) {
          return question;
        } else {
          return q;
        }
      });
      setQuiz({...quiz, questions: newQuestions});
    }
  };

  const fetchQuizHandler: AppContextProps['fetchQuiz'] = async () => {
    console.log('fetching quiz');
    const client = new HttpClient();
    try {
      const data = await client.getQuestions();
      const q: Quiz = new Quiz(data, QuizState.unStarted);
      console.log('fetching quiz SUCCESS');
      console.log(`fetch quiz status: ${q.state}`);
      setQuiz(q);
    } catch (error) {
      console.log('error on fecth quiz:');
      console.log(error);
      fetchQuizHandler();
    }
  };

  const contextValue: AppContextProps = {
    loggedIn,
    quiz,
    setUserLoggedIn: setUserLoggedInHandler,
    updateQuizStatus: updateQuizStatusHandler,
    updateQuestion: updateQuestionHandler,
    fetchQuiz: fetchQuizHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
