import React, { Component } from 'react';

import {
  StyleSheet,
  Text, Image, TextInput,
  View, TouchableOpacity, StatusBar, Navigator, AsyncStorage
} from 'react-native';
var t = require('tcomb-form-native');
import Toaster, { ToastStyles } from 'react-native-toaster'
var axios = require('axios');
import Signup from '../Signup/Signup';
import Auth from '../../Auth/Auth.js';
const STORAGE_KEY = 'token';
var base64 = require('base-64');


export default class LoginForm extends Component {

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: "",
      message: null
    }
    this.onLogin = this.onLogin.bind(this);

  }

  onButtonPress() {
    this.props.navigator.push({
      component: 'Signup'
    });
  }

  onLogin() {
    let self = this;
    var user = {
      email: self.state.username,
      password: self.state.password,
    };
    // var formBody = [];

    // for (var property in user) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(user[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");

    axios.head('http://10.0.0.230/api/v1.0/users', {
      headers: { 'Authorization': 'basic' + base64.encode("user.email:user.password") }
    }, JSON.stringify(user)
    )
      .then(function (response) {
        console.log(response);
        if (response.status == 200)
          // alert("Login Successful");
          Auth.authenticateUser(STORAGE_KEY, response.token);
        self.setState({ message: { text: 'Login Successful!', styles: ToastStyles.success } });

        self.props.navigator.push({
          component: 'Chat',
          username: this.state.username
        });
      }).catch(function (error) {
        console.log(error);
        self.setState({ message: { text: 'Failed to Login', styles: ToastStyles.error } });
        // console.error(error);
      })
  };
  render() {

    return (

      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TextInput style={styles.input}
          placeholder='Username or email id'
          onChangeText={(val) => this.setState({ username: val })}
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          placeholderTextColor='rgba(255,255,255,0.8)'
          keyboardType='email-address'
        />
        <TextInput style={styles.input}

          placeholder='Password'
          onChangeText={(val) => this.setState({ password: val })}
          secureTextEntry
          returnKeyType='go'
          ref={(input) => this.passwordInput = input}
          placeholderTextColor='rgba(255,255,255,0.8)'
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={this.onLogin.bind(this)}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
          <Text style={styles.buttonText} > Sign-up </Text>
        </TouchableOpacity>
        <Toaster message={this.state.message} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  input: {
    height: 40,
    width: 300,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF'
  }

});