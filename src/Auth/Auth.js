import {
  AsyncStorage
} from 'react-native';


export default class Auth {


   static authenticateUser(token, value) {
    try {
       AsyncStorage.setItem(token, value);
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