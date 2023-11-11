import uuid from 'react-native-uuid';
import {Utils} from '../../utils/Utils';

export type Answer = {
  answer: string;
  isCorrect: boolean;
};

export class Question {
  id: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  userSelection?: string;
  answers: Answer[];

  private populateAnswers(): Answer[] {
    const list: string[] = Utils.shuffleArray([
      ...this.incorrect_answers,
      this.correct_answer,
    ]);
    const answers: Answer[] = list.map(item => {
      return {
        answer: item,
        isCorrect: item === this.correct_answer ? true : false,
      };
    });
    return answers;
  }

  constructor(
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
  ) {
    this.id = uuid.v4().toString();
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.correct_answer = correct_answer;
    this.question = question;
    this.incorrect_answers = incorrect_answers;
    this.answers = this.populateAnswers();
  }
}
