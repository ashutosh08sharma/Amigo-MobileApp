import React, { Component } from 'react';
import {GiftedChat, Actions} from 'react-native-gifted-chat';


  import {
  StyleSheet,
  Text, Image, TextInput, ScrollView,    
  View,TouchableOpacity, Navigator,AsyncStorage,ToolbarAndroid
} from 'react-native';

export default class Chat extends  Component 
{

constructor(){
 super();
         this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  

//  async function getMessages() {
//     try {
//       let response = await fetch('http://www.localhost:3000/auth/messages');
//       let responseJson = await response.json();
//       return responseJson.messages;

//     } catch(error) {
//       console.error(error);
//     }
//   }
// }
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

 onSend(messages = []) {
    this.setState((previousState) => {
      return {
        //post messages
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

render(){
return (
     <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
);
}

   

  }
