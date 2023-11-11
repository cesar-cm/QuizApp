import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AnswerView from '../../components/AnswerView';
import {Answer} from '../../store/models/Question';

interface AnswersViewProps {
  answers: Answer[];
  onChooseAnswer: (answer: string) => void;
  userSelection?: string;
  isQuizDone: boolean;
}

const AnswersView: React.FC<AnswersViewProps> = ({
  answers,
  onChooseAnswer,
  userSelection,
  isQuizDone,
}) => {
  const [selected, setSelected] = useState<Answer | undefined>(undefined);
  const onPressHandler = (answer: Answer) => {
    setSelected(answer);
    onChooseAnswer(answer.answer);
  };

  useEffect(() => {
    if (userSelection) {
      const selectedAnswer = answers.find(a => a.answer === userSelection);
      setSelected(selectedAnswer);
    }
  }, [answers, userSelection]);

  return (
    <View style={styles.component}>
      {answers.map((a, index) => {
        return (
          <AnswerView
            answer={a}
            onPress={() => onPressHandler(a)}
            isSelected={selected && selected.answer === a.answer ? true : false}
            key={index}
            isQuizDone={isQuizDone}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
  },
});

export default AnswersView;
