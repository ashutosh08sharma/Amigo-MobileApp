import React, { Component } from 'react';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
//var ToolbarAndroid = require('ToolbarAndroid');
import {
  StyleSheet,
  Text, Image, TextInput, ScrollView,
  View, TouchableOpacity, Navigator, AsyncStorage, ToolbarAndroid
} from 'react-native';
import Auth from '../../../Auth/Auth.js';
var config = {
  headers: { 'Authorization': 'basic' + Auth.getToken('user') }
};
// chat component
export default class Chat extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      request_id: '',
      actionText: 'Amigo Chat',
      message: null
    };
    this.onSend = this.onSend.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }
  // get message from backend
  getMessage(callback) {
    return axios.get('http://10.0.0.230//api/v1.0/cmd/response/', {
      params: {
        ID: Auth.getToken('messageId')
      },
      config
    })
      .then(function (response) {
        callback({
          _id: response._id,
          text: repsonse.resp,
          createdAt: new Date(response.startTime),
          user: {
            _id: response.resp.userId,
            name: response.resp.userName
          }
        })
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    //loadMessage here
    getMessage((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    })
  }
  // send message to bot service
  onSend(message) {
    let self = this;
    axios.post("http://10.0.0.230/api/v1.0/chat"), config, JSON.stringify(message)
      .then(function (response) {
        console.log(response);
        if (response.status == 202)
          // get request id from  resposne and updating state
          self.setState({
            requestId = response._id
          })
        alert("Successful");
        self.setState({ message: { text: 'Message Sent', styles: ToastStyles.success } });
        self.props.navigator.push({
          component: 'Chat'
        });
      }).catch(function (error) {
        console.log(error);
        self.setState({ message: { text: 'Message failed', styles: ToastStyles.error } });
      })
  };
  _onActionSelected = (position) => {
    if (toolbarActions[position].title == 'Edit Profile') {
      this.setState({
        actionText: 'Selected ' + toolbarActions[position].title,
      });
      this.props.navigator.push({
        component: 'UpdateProfile'
      })
    }
    if (toolbarActions[position].title == 'Logout') {
      Auth.deauthenticateUser('token');
      this.props.navigator.replace({
        component: 'Login'
      })
    };}

  render() {
    return (
      <View>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: Auth.getToken('user'),
            name: this.props.username
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
  }
}


var toolbarActions = [
  { title: 'Edit Profile', show: 'always' },
  { title: 'Logout' },
];

const styles = StyleSheet.create({

  toolbar: {
    backgroundColor: '#3498db',
    height: 56,
  },
})