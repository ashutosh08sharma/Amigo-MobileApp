/* Created By Ashutosh Sharma */
'use strict';
import React, { Component } from 'react';

  import {
  StyleSheet,
  Text, Image, TextInput, ScrollView,    
  View,TouchableOpacity, Navigator,AsyncStorage
} from 'react-native';
var t = require('tcomb-form-native');
var axios = require('axios');
import Auth from '../../Auth/Auth.js'
const STORAGE_KEY = 'token';

//  var Form = t.form.Form;

// var Person = t.struct({
//   name: t.String,              // a required string
//   email: t.String,  // an  string
//   password: t.String,               // a required number
//   slackUser :t.String,
//    riaUUID : t.String,
//    awsCreds :  t.maybe(t.String),
//   access_key_id : t.String,
//   secret_access_key : t.String,
//   region :  t.String     // a String 
// });

// var options = {}; 


export default class Signup extends Component {
constructor(){
 super();

    this.state = {
        username :'',
        email :'',
        password :'',
        riaId :'',
        slackId :'',
        awsAccessKey :'',
        awsSecretKey:'',
        region:'',
        errors :''

    }
    
}
onCancel(){
this.setState = {
        username :'',
        email :'',
        password :'',
        riaId :'',
        slackId :'',
        awsAccessKey :'',
        awsSecretKey:'',
        region:'',
   }
}

 onRegisterPress()
{
  var params = {
        name : this.state.username,
        email : this.state.email,
        password : this.state.password,
        slackUser : this.state.slackId,
        riaUUID : this.state.riaId,
        awsCred : "aws Cred",
        accessKeyId : this.state.awsAccessKey,
        secretAccessKey : this.state.awsSecretKey,
        region : this.state.region
  };

var formBody = [];
for (var property in params) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(params[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
axios.post('http://10.0.0.230:3000/auth/signup',formBody
  )
  .then(function (response) {
    console.log(response);
    if(response.status == 200)
          alert("200");
           this.setState({errors:""});
      
          this.props.navigator.push({
      component: 'Login'
  })
  })
  .catch(function (error) {
    console.log(error);
    // this.setState({errors: error});
    console.error(error);
  })};

    render() {
    return (
        <ScrollView>
      <View style={styles.container}>
          <Text style={styles.text}> Registration </Text>

 <TextInput  style ={styles.textContainer}
 onChangeText={(val) => this.setState({username:val})}
     placeholder = 'Username'
     returnKeyType='next'/>

     <TextInput  style ={styles.textContainer}
      onChangeText={(val) => this.setState({email:val}) }
     placeholder = 'Email Id'
     returnKeyType='next'/>

     <TextInput  style ={styles.textContainer}
      onChangeText={(val) => this.setState({password:val}) }
     placeholder = 'Password'
     secureTextEntry
     returnKeyType='next'/>

     <TextInput  style ={styles.textContainer}
      onChangeText={(val) => this.setState({slackId:val}) }
     placeholder = 'Slack Id'
     returnKeyType='next'/>

      <TextInput  style ={styles.textContainer} 
     onChangeText={(val) => this.setState({riaId:val}) }
     placeholder = 'RIA UUID'
     returnKeyType='next'/>

     <TextInput  style ={styles.textContainer} 
     onChangeText={(val) => this.setState({awsAccessKey:val}) }
     placeholder = 'AWS Access Key'
     returnKeyType='next'/>

      <TextInput  style ={styles.textContainer}
       onChangeText={(val) => this.setState({awsSecretKey:val}) }
     placeholder = 'AWS Secret Access Key'
     returnKeyType='next'/>

      <TextInput  style ={styles.textContainer}
      onChangeText={(val) => this.setState({region:val}) }
     placeholder = 'Region'
     returnKeyType='next'/>
{/*
     <Form
          ref="form"
          type={Person}
          options={options}
        />*/}

      <TouchableOpacity style ={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.onRegisterPress.bind(this)}> Register</Text>
         </TouchableOpacity>

          <TouchableOpacity style ={styles.cancelBttn}>
          <Text style={styles.buttonText} onPress={this.onCancel.bind(this)}> Cancel</Text>
         </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor:'#3498db',
  },
  text :{
    textAlign:'center',
    paddingVertical:10,
    fontSize:20,
    fontWeight :'bold',
    color : '#2c3e50'
  },
  textContainer:{
      height: 40,
      width : 250,
      textAlign:'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom : 40,
      paddingHorizontal :10   
  },
  buttonContainer :{
      backgroundColor:'#2980b9',
      flexDirection:'row',
      flexWrap :'wrap',
     paddingVertical : 10,
      width:250,
      marginBottom :10,
  },
  buttonText:{
    textAlign : 'center',
   paddingHorizontal :90,
    color :'#FFF'
  },
  cancelBttn:{
        backgroundColor:'#c0392b',
      flexDirection:'row',
      flexWrap :'wrap',
      paddingVertical : 10,
      width:250,
      marginBottom :10,
  }
});