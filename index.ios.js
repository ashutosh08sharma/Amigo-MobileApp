/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from './src/component/Login/Login'
import Signup from './src/component/Signup/Signup'
import LoginForm from './src/component/Login/LoginForm'
import Chat from './src/component/dashboard/chat/Chat'
import UpdateProfile from './src/component/UpdateProfile/editProfile'

  import {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  View, Navigator
} from 'react-native';

export default class AmigoApp extends Component {
  renderScence(route, navigator){
switch(route.component){
  case 'Login' :
  return (<Login navigator ={navigator} title ="Login"/>)

  case 'Signup' :
  return (<Signup  navigator ={navigator} title ="Register"/>)

  case 'Chat' :
  return (<Chat navigator ={navigator} title="Chat"/>)

  case 'UpdateProfile' :
  return (<UpdateProfile navigator ={navigator} title="Update Profile"/>)
  
} }
 render() {
    return (
      <Navigator
      initialRoute = {{component :'Login'}}
      renderScene ={this.renderScence.bind(this)}
      configureScene={(route,routeStack) => Navigator.SceneConfigs.FloatFromLeft}
      />
    );
  }}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },

});

AppRegistry.registerComponent('AmigoApp', () => AmigoApp);
