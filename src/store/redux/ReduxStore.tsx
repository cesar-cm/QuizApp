import {configureStore} from "@reduxjs/toolkit";
import {Quiz, QuizState} from "../models/Quiz";
import {Question} from "../models/Question";

export interface AppStore {
  loggedIn: boolean;
  quiz?: Quiz;
}

export default configureStore<AppStore> {
  reducer: {

  }
};
