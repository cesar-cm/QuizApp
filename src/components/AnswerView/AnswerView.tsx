import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Fonts, Colors} from '../../constants/UIKit';
import {Answer} from '../../store/models/Question';

interface AnswerViewProps {
  answer: Answer;
  onPress: (answer: Answer) => void;
  isSelected: boolean;
  isQuizDone: boolean;
}

const AnswerView: React.FC<AnswerViewProps> = ({
  answer,
  onPress,
  isSelected,
  isQuizDone,
}) => {
  const color = () => {
    if (isQuizDone) {
      if (answer.isCorrect && isSelected) {
        return styles.correct;
      }
      if (isSelected) {
        return styles.selected;
      }
      if (!answer.isCorrect) {
        return styles.incorrect;
      }
      if (answer.isCorrect) {
        return styles.correct;
      }
    }
    if (isSelected) {
      return styles.selected;
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(answer)}
      style={[styles.component, color()]}
      disabled={isQuizDone}>
      <Text style={styles.answerText}>{answer.answer}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  component: {
    width: '90%',
    padding: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
  },
  answerText: {
    fontSize: Fonts.size.body,
  },
  selected: {
    backgroundColor: Colors.background.gray,
  },
  incorrect: {
    backgroundColor: Colors.background.lightPink,
  },
  correct: {
    backgroundColor: Colors.background.green,
  },
});

export default AnswerView;
