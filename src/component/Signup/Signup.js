/* Created By Ashutosh Sharma */
import React, { Component } from 'react';

  import {
  StyleSheet,
  Text, Image, TextInput, ScrollView,    
  View,TouchableOpacity, Navigator,AsyncStorage
} from 'react-native';


export default class Signup extends Component {
constructor(){
 super();

    this.state = {
        username ="",
        email ="",
        password ="",
        riaId ="",
        slackId ="",
        awsAccessKey ="",
        awsSecretKey="",

    }

}

async onRegisterPress(){
 try{

fetch('endpoint/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
     user :{
        name : this.state.username,
        email : this.state.email,
        password : this.state.password,
        slackUser : this.state.slackId,
        riaUUID : this.state.riaId,
        awsCreds : {
            access_key_id : this.state.awsAccessKey,
            secret_access_key : this.state.awsSecretKey,
            region : this.state.region
        }
     }
  })
});

let  res = await Response.text();
if(response.status ==201){
    console.log( "res" + res);
}
else{
     let errors = res;
     throw errors;
}

}
 catch(errors){
    console.log("catch errors:"+errors);
 
 }

}

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

     <TouchableOpacity style ={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.onRegisterPress.bind(this)}> Register</Text>
         </TouchableOpacity>
          <TouchableOpacity style ={styles.cancelBttn}>
          <Text style={styles.buttonText}> Cancel</Text>
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
      falexDirection:'row',
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