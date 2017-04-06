import React, { Component } from 'react';

  import {
  StyleSheet,
  Text, Image,   
  AsyncStorage,   
  View, KeyboardAvoidingView,Navigator
} from 'react-native';
import LoginForm from './LoginForm';
import Signup from '../Signup/Signup';


export default class Login extends Component {
  render() {
    return (
<KeyboardAvoidingView behavior="padding" style={styles.container}>
     <View style={styles.LogoContainer}>
          <Text style = {styles.title}>  Amigo Chatbot </Text>
            <Image style ={styles.logo}
                source={require('../../../images/Amigo.png')} />  
      </View>
          <View style={styles.formContainer}>
            <LoginForm  navigator={this.props.navigator} /> 
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logo:{
      height :200,
      width :200,
  },
  LogoContainer :{
      flexGrow :1,
      alignItems :'center',
      justifyContent :'center'
  },

  title :{
      color:'#2c3e50',
      fontSize :20,
      fontWeight:'bold',
      marginTop :10,
      width :160,
      textAlign :'center',
      opacity :0.9
  }

});