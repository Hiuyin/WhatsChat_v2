// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import Fire2 from '../DataBase/Fire2';




class Chat extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    console.log(this.props.navigation.state.params.name)
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire2.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire2.shared.send}
        user={this.user}
      />
      
    );
    console.log(Fire2.shared.send);
  }

  componentDidMount() {
    try {
      Fire2.shared.on(message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      );
      
    } catch (error) {
      console.log(error);
    }
    
}
  componentWillUnmount() {
    Fire2.shared.off();
  }
}

export default Chat;
