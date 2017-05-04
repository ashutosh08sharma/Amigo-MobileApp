import {
AsyncStorage
} from 'react-native';


export default class Auth {


    static async authenticateUser(token) {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

 
  static isUserAuthenticated() {
    return AsyncStorage.getItem('token') !== null;
  }

  
  static deauthenticateUser() {
    AsyncStorage.removeItem('token');
  }

 

  static getToken() {
    return AsyncStorage.getItem('token');
  }

}