import {Question} from './Question';

export type APIResponse = {
  response_code: number;
  results: Question[];
};
