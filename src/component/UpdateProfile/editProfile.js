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
import Toaster, { ToastStyles } from 'react-native-toaster';
 var config = {
  headers: {'Authorization' : 'bearer ${Auth.getToken()}'}
};

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
        errors :'',
        message:null
    }
    
}


componenDidMount(){
 axios.get('http://10.0.0.230:3000/users/',{
    params: {
      ID: 12345
    },config
  })
  .then(function (response) {
    console.log(response);
    this.setState({
        username :response.name,
        email :response.email,
        password :response.password,
        riaId :repsonse.riaUUID,
        slackId :response.slackUser,
        awsAccessKey :response.accessKeyId,
        awsSecretKey:response.awsSecretKey,
        region:repsonse.region

    })
  })
  .catch(function (error) {
    console.log(error);
  });

}
onCancel(){
this.props.navigator.pop({
      component :'UpdateProfile'
  })
};

onUpdatePress()
{
  let self = this;
  var param = {
        name : self.state.username,
        email : self.state.email,
        password : self.state.password,
        slackUser : self.state.slackId,
        riaUUID : self.state.riaId,
        awsCred : "aws Cred",
        accessKeyId : self.state.awsAccessKey,
        secretAccessKey : self.state.awsSecretKey,
        region : self.state.region
  };

var formBody = [];
for (var property in param) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(param[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
axios.put('http://10.0.0.230/api/v1.0/users', formBody,
  {
    params: {
      ID: self.state.name
    },config
  })
  .then(function (response) {
    console.log(response);
    if(response.status == 200)
          alert("200");
           self.setState({errors:""});
       self.setState({message:{text: 'Update Successful!', styles: ToastStyles.success}});
          self.props.navigator.push({
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
        <ScrollView>
      <View style={styles.container}>
          <Text style={styles.text}> Update Profile </Text>
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

      <TouchableOpacity style ={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.onUpdatePress.bind(this)}> Update</Text>
         </TouchableOpacity>

          <TouchableOpacity style ={styles.cancelBttn}>
          <Text style={styles.buttonText} onPress={this.onCancel.bind(this)}> Cancel</Text>
         </TouchableOpacity>
      </View>
       <Toaster message={this.state.message} />
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