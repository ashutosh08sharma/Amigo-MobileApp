import {
  AsyncStorage
} from 'react-native';


export default class Auth {


  async static authenticateUser(token, value) {
    try {
      await AsyncStorage.setItem(token, value);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


  static isUserAuthenticated(token) {
    return AsyncStorage.getItem(token) !== null;
  }


  static deauthenticateUser(token) {
    AsyncStorage.removeItem(token);
  }



  static getToken(token) {
    return AsyncStorage.getItem(token);
  }

}