import React, { Component } from 'react';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
//var ToolbarAndroid = require('ToolbarAndroid');
import {
  StyleSheet,
  Text, Image, TextInput, ScrollView,
  View, TouchableOpacity, Navigator, AsyncStorage, ToolbarAndroid
} from 'react-native';
import Auth from '../../../Auth/Auth.js';

export default class Chat extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
       actionText: 'Amigo Chat',
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    //get all getMessages 
    // axios.get('/user', {
    //     params: {
    //       ID: 12345
    //     }
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    this.setState({
      // hard coded for now
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2017, 3, 10, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  componentWillMount() {
    this.setState({
      // hard coded for now
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2017, 3, 10, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  } 


   _onActionSelected = (position) => {
     if(toolbarActions[position].title =='Edit Profile'){
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
    this.props.navigator.push({
      component : 'UpdateProfile'
    })
  }
  if(toolbarActions[position].title =='Logout'){
     Auth.deauthenticateUser();
    this.props.navigator.replace({
      component :'Login'
  })
  };
}


  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        //post messages
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <View>
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
       <ToolbarAndroid
            actions={toolbarActions}
            onActionSelected={this._onActionSelected}
            style={styles.toolbar}
            subtitle={this.state.actionText}
            title="Amigo" />
    </View>
    );
  }}

   var toolbarActions = [
  {title: 'Edit Profile', show: 'always'},
  {title: 'Logout'},
];

const styles = StyleSheet.create({

toolbar: {
    backgroundColor: '#3498db',
    height: 56,
  },
})