import AsyncStorage from '@react-native-async-storage/async-storage';

const MY_Session_KEY = '@MySession:Key';
export interface UserSession {
  isLoggedIn: boolean;
}

const useSessionStorage = () => {
  const handleSaveSession = async (logged: boolean) => {
    try {
      await AsyncStorage.setItem(
        MY_Session_KEY,
        JSON.stringify({isLoggedIn: logged}),
      );
      return Promise.resolve('Success');
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleGetSession = async (): Promise<UserSession | undefined> => {
    try {
      const currentSession = await AsyncStorage.getItem(MY_Session_KEY);
      if (currentSession !== null) {
        const currentSessionParsed: UserSession = JSON.parse(currentSession);
        return Promise.resolve(currentSessionParsed);
      } else {
        handleSaveSession(false);
        return handleGetSession();
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  return {
    onSaveSession: handleSaveSession,
    onGetSession: handleGetSession,
  };
};

export default useSessionStorage;
