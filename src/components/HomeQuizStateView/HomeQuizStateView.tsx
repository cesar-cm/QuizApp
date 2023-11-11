import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {QuizState} from '../../store/models/Quiz';
import ButtonApp from '../ButtonApp';
import {Fonts} from '../../constants/UIKit';

interface HomeQuizStateViewProps {
  state: QuizState;
  action: () => void;
}

const HomeQuizStateView: React.FC<HomeQuizStateViewProps> = ({
  state,
  action,
}) => {
  const titleText = (): string => {
    let label: string = '';
    switch (state) {
      case QuizState.unStarted:
        label = 'Welcome!, you have one Quiz ready to start';
        break;
      case QuizState.inProgress:
        label = 'Welcome back!, seems you have a quiz already started';
        break;
      case QuizState.done:
        label = 'thanks for complete your quiz!';
        break;
      default:
        label = '';
        break;
    }
    return label;
  };
  const buttonText = (): string => {
    let label: string = '';
    switch (state) {
      case QuizState.unStarted:
        label = 'Start quiz';
        break;
      case QuizState.inProgress:
        label = 'resume quiz';
        break;
      case QuizState.done:
        label = 'check my results';
        break;
      default:
        label = '';
        break;
    }
    return label;
  };

  return (
    <View>
      <Text style={styles.title}>{titleText()}</Text>
      <ButtonApp title={buttonText()} action={action} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Fonts.size.largeTitle,
    marginVertical: 30,
  },
});

export default HomeQuizStateView;
