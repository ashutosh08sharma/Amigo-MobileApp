import React, { Component } from 'react';

  import {
  StyleSheet,
  Text, Image, TextInput,     
  View,TouchableOpacity,StatusBar,Navigator,AsyncStorage
} from 'react-native';
var t = require('tcomb-form-native');
var axios = require('axios');
import Signup from '../Signup/Signup';
import Auth from '../../Auth/Auth.js'


export default class LoginForm extends Component {

    constructor(){
        super();

        this.state = {
            username : "",
            password : "",
            errors : ""
        }
        this.onLogin = this.onLogin.bind(this);
    }
    
    onButtonPress() {
       this.props.navigator.push({
           component: 'Signup'
       });
    }

async onLogin(){
var user = {
        email : this.state.username,
        password : this.state.password,
};
var formBody=[];

for (var property in user) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(user[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

axios.post('http://10.0.0.230:3000/auth/login',formBody
  )
  .then(function (response) {
    console.log(response);
    if(response.status == 200)
          alert("Login Successful");
         //  this.setState({errors:""});
          this.props.navigator.push({
      component: 'Chat'
  })
  })
  .catch(function (error) {
    console.log(error);
   // this.setState({errors: error});
    console.error(error);
  })};
  render() {

    return (
      <View style={styles.container}>
          <StatusBar barStyle ="light-content"/> 
          <TextInput style ={styles.input}
          placeholder = 'Username or email id'
          onChangeText ={(val)=>this.setState({username :val})}
          returnKeyType='next'
          onSubmitEditing = {() => this.passwordInput.focus()}
          placeholderTextColor ='rgba(255,255,255,0.8)'
          keyboardType ='email-address'
          />
          <TextInput style ={styles.input}
          placeholder = 'Password'
          onChangeText = {(val)=>this.setState({password:val})}
          secureTextEntry
          returnKeyType='go'
          ref ={(input) => this.passwordInput = input}
          placeholderTextColor ='rgba(255,255,255,0.8)'
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={this.onLogin}>
              <Text style= {styles.buttonText}> Login </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
              <Text style= {styles.buttonText} > Sign-up </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     padding :30
  },
  input:{
      height: 40,
      width : 300,
      textAlign:'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom : 40,
      paddingHorizontal :20 ,
  },
  buttonContainer :{
      backgroundColor:'#2980b9',
      paddingVertical : 10,
      marginBottom :10
  },
  buttonText:{
    textAlign : 'center',
    color :'#FFF'
  }

});