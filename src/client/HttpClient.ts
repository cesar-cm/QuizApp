import axios from 'axios';
import {Question} from '../store/models/Question';
import {APIResponse} from '../store/models/APIResonse';
import * as he from 'he';

export class HttpClient {
  private baseURL: string =
    'https://opentdb.com/api.php?amount=10&difficulty=hard';

  constructor() {}

  public getQuestions(): Promise<Question[]> {
    return new Promise((resolve, reject) => {
      axios
        .get<APIResponse>(this.baseURL)
        .then(response => {
          const questions = response.data.results.map(item => {
            return new Question(
              he.decode(item.category),
              he.decode(item.type),
              he.decode(item.difficulty),
              he.decode(item.question),
              he.decode(item.correct_answer),
              item.incorrect_answers.map(answer => {
                return he.decode(answer);
              }),
            );
          });
          resolve(questions);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
