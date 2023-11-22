import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
import {Fonts} from '../../constants/UIKit';
import AnswersView from '../../components/AnswersView';
import CategoryTagView from '../../components/CategoryTagView';
import {Question} from '../../store/models/Question';
import {QuizState} from '../../store/models/Quiz';
// use redux
import configureStore from '../../store/redux/ReduxStore';
import {useDispatch} from 'react-redux';
import {updateQuestion} from '../../store/redux/states/quizStore';

type AppDispatch = typeof configureStore.dispatch;
interface QuestionScreenProps {
  question: Question;
  index: number;
  totalQuestions: number;
  quizState: QuizState;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  index,
  totalQuestions,
  quizState,
}) => {
  const fadeOutAnimation = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Animated.timing(fadeOutAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeOutAnimation, question.userSelection]);

  //user interaction
  const onChooseAnswerHandler = (answer: string) => {
    question.userSelection = answer;
    dispatch(updateQuestion(question));
  };

  return (
    <View style={styles.component}>
      <ScrollView>
        <View style={styles.categoryContainer}>
          <CategoryTagView text={question.category} />
          <CategoryTagView text={question.difficulty} />
        </View>
        <Animated.View style={{opacity: fadeOutAnimation}}>
          <Text style={styles.questionText}>{question.question}</Text>
        </Animated.View>
        <AnswersView
          answers={question.answers}
          onChooseAnswer={onChooseAnswerHandler}
          userSelection={question.userSelection}
          isQuizDone={quizState === QuizState.done}
        />
      </ScrollView>
      <Text>
        Question {index + 1} of {totalQuestions}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: Fonts.size.largeTitle,
    marginVertical: 20,
  },
  categoryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  userSelectionText: {
    padding: 20,
  },
  result: {
    flex: 1,
    padding: 5,
  },
});

export default QuestionScreen;
