import {Question} from './Question';

export enum QuizState {
  unStarted,
  inProgress,
  done,
}

export class Quiz {
  questions: Question[] = [];
  state: QuizState = QuizState.unStarted;
  constructor(questions: Question[], state: QuizState | null) {
    this.questions = questions;
    this.state = state ?? QuizState.unStarted;
  }
}
