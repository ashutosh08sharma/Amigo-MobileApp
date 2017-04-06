import React, { Component } from 'react';

  import {
  StyleSheet,
  Text, Image, TextInput,     
  View,TouchableOpacity,StatusBar,Navigator,AsyncStorage
} from 'react-native';
import Signup from '../Signup/Signup';
//import { Actions } from 'react-native-router-flux'

export default class LoginForm extends Component {

    constructor(){
        super();

        this.state = {
            username = "",
            password = "",

        }
    }
    
    onButtonPress() {
       this.props.navigator.push({
           component: 'Signup'
       });
    }

  async  onLogin(){
       try{
 //var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
fetch('/', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   // 'Authorization': 'Bearer ' + DEMO_TOKEN
    
  },
  body: JSON.stringify({
     user :{
        name : this.state.username,
        password : this.state.password,
     }
  })
});

let  res = await Response.text();
if(response.status ==200){
    console.log( "res" + res);
}
else{
     let errors = res;
     throw errors;
}

}
 catch(errors){
    console.log("catch errors:"+ errors);
 
 }



    }
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

          <TouchableOpacity style={styles.buttonContainer} onPress={this.onLogin.bind(this)}>
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