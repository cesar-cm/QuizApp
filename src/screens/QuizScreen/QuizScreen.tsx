import {StyleSheet, View, Dimensions, Text} from 'react-native';
import React from 'react';
import {Quiz, QuizState} from '../../store/models/Quiz';
import PagerView from 'react-native-pager-view';
import QuestionScreen from '../QuestionScreen/QuestionScreen';
import ButtonApp from '../../components/ButtonApp';
import {Fonts} from '../../constants/UIKit';

////// NOTE: PagerView have an issue when we return a null component like { null }
//*https://github.com/callstack/react-native-pager-view/issues/300
// to fix: add "if(!child){ return}" on:
// /node_modules/react-native-pager-view/src/utils.tsx

export interface QuizScreenProps {
  quiz: Quiz;
  onComplete: () => void;
}

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

const QuizScreen: React.FC<QuizScreenProps> = ({quiz, onComplete}) => {
  const questions = quiz.questions;

  const onPageChanged = (event: {nativeEvent: {position: number}}) => {
    const {position} = event.nativeEvent;
    console.log(`user changed the page to ${position}`);
  };

  const completeQuizHandler = () => {
    console.log('user mark as completed quiz');
    onComplete();
  };

  const calculateScore = (): number => {
    let score = 0;
    questions.forEach(q => {
      if (q.userSelection && q.userSelection === q.correct_answer) {
        score++;
      }
    });
    return score;
  };

  return (
    <View style={styles.view}>
      <PagerView style={styles.pagerView} onPageSelected={onPageChanged}>
        {/* show results in case quiz is done */}
        {quiz.state === QuizState.done && (
          <View style={styles.completeQuizview}>
            <Text style={styles.textTitle}>This is your Score:</Text>
            <Text style={styles.textTitle}>{`${calculateScore()} of ${questions.length}`}</Text>
            <Text>slide to see answers</Text>
          </View>
        )}
        {/* show questions */}
        {questions.map((question, i) => {
          return (
            <QuestionScreen
              question={question}
              key={quiz.state === QuizState.done ? i + 1 : i}
              index={i}
              totalQuestions={questions.length}
              quizState={quiz.state}
            />
          );
        })}
        {/* show button to comple the quiz */}
        {quiz.state === QuizState.inProgress && (
          <View style={styles.completeQuizview} key={questions.length}>
            <Text style={styles.textTitle}>You want to complete the quiz?</Text>
            <ButtonApp
              title="compete quiz"
              action={() => completeQuizHandler()}
              buttonStyle={styles.compleQuizButton}
              textStyle={{color: 'white'}}
            />
          </View>
        )}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
    width: widthScreen - 20,
    height: heightScreen - 20,
  },
  textTitle: {
    fontSize: Fonts.size.largeTitle,
  },
  completeQuizview: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
  },
  compleQuizButton: {
    marginVertical: 20,
    backgroundColor: 'black',
  },
});

export default QuizScreen;
