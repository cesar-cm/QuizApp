# QuizApp

### Background

This app shows a main screen at the beginning that checks the session object to see if the user is already logged in. In case there is no active session, the app will show the LogIn screen. Once the user logs in, the app will display the Home screen.

The session object is simply a boolean stored in the app, wrapped into one object.

Once on the Home screen, the app will try to fetch a quiz from the API, parse the result into the Quiz object, and store it in the context API.

Any time the user chooses an answer, the context will update the question answer object in the quiz.

When the user decides to end a quiz, the app will be able to show the results.

Any time the app is open and the user has an active session, a new quiz will be fetched.

### Dependencies
This project uses:
- TypeScript
- Built without using Expo
- ***Axios*** to get the data from the Quiz API.
- ***React native Navigation*** to show the corresponding screens according to the session object.
- ***Async storage*** to store the session object.
- ***Redux API*** to manage the state of the app.
- ***Pager View*** a npm pacage to show Page View.

### Important Note

If you will run ***npm install*** ensure that the file ***utils.tsx*** have this line of code:

```
if(!child){ return}
```

on the path:

```
/node_modules/react-native-pager-view/src/utils.tsx
```

this because there is aknown issue on the pager view library, check here:

```
https://github.com/callstack/react-native-pager-view/issues/300
```
