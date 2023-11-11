import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
import {Fonts} from '../../constants/UIKit';
import AnswersView from '../../components/AnswersView';
import CategoryTagView from '../../components/CategoryTagView';
import {Question} from '../../store/models/Question';
import {AppContext} from '../../store/context/AppContext';
import {QuizState} from '../../store/models/Quiz';

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
  const context = useContext(AppContext);

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
    context.updateQuestion(question);
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
      {/* {quizState && quizState === QuizState.done && question.userSelection ? (
        <View style={styles.result}>
          <Text
            style={
              styles.userSelectionText
            }>{`You chose: ${question.userSelection} `}</Text>
          <Text
            style={
              styles.userSelectionText
            }>{`correct answer: ${question.correct_answer} `}</Text>
        </View>
      ) : null} */}
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
