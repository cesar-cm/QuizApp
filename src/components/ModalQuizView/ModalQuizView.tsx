import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import QuizScreen from '../../screens/QuizScreen/QuizScreen';
import {Quiz} from '../../store/models/Quiz';

interface ModalQuizViewProps {
  isVisible: boolean;
  onClose: () => void;
  onCompleteQuiz: () => void;
  quiz: Quiz;
}

const ModalQuizView: React.FC<ModalQuizViewProps> = ({
  isVisible,
  onClose,
  quiz,
  onCompleteQuiz,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => onClose()}>
            <Text style={styles.textClose}>Close Modal [x]</Text>
          </TouchableOpacity>
          <QuizScreen quiz={quiz} onComplete={onCompleteQuiz} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 0.8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textClose: {
    textAlign: 'right',
  },
});

export default ModalQuizView;
