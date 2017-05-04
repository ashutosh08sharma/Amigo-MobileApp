/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from './src/component/Login/Login'
import Signup from './src/component/Signup/Signup'
import LoginForm from './src/component/Login/LoginForm'
//import {Scene,Router} from 'react-native-router-flux'
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
  
}

}

  render() {
    return (
      <Navigator
      initialRoute = {{component :'Login'}}
      renderScene ={this.renderScence.bind(this)}
      configureScene={(route,routeStack) => Navigator.SceneConfigs.FloatFromLeft}
      />
    );
  }
}

/*render() {
    return <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login" initial/>
        <Scene key="register" component={Signup} title="Register"/>
      </Scene>
    </Router>
  }

}*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },

});

AppRegistry.registerComponent('AmigoApp', () => AmigoApp);
