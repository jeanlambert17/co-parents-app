import React, { Component } from 'react';
// React native components
import { 
  FlatList,
} from 'react-native';
// Components
import ChatItem from './components/chat-item';
import Layout from './components/layout';
import EmptyList from './components/empty-list';
import Footer from './components/footer';
// Api or services
import MessagesService from '../../api/messages';
// Utilities
import handleAvatarProps from '../../utils/handle-props';
import moment from 'moment';
import MessageHandler from '../../utils/message-handler';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.api = new MessagesService(this.props.user);
    this.messageHandler = new MessageHandler();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this._getChats();
  }

  _getChats = async() => {
    const [chats,err] = await this._makeRequest(() => this.api.getChats());
    if(err) {
      this.messageHandler.errorMessage(err);
      return;
    }
    this.props.setChats(chats);
    this.api.listenToChats((chatId,messages) => {
      this.props.setMessages(chatId,messages);
    });
  }

  _makeRequest = async (cb)  => {
    this.setState({loading:true});
    const data = await cb();
    this.setState({loading:false});
    return data;
  }

  _renderItem = ({ item }) => {
    const { messages, icon, name } = item;
    const leftAvatar = handleAvatarProps(icon,name[0].toUpperCase());
    let value = '', timestamp = '';
    if(messages.length > 0) {
      const last = messages[messages.length-1];
      value = last.value;
      timestamp = last.timestamp;
    }
    return <ChatItem
      onPress={() => this.props.navigation.navigate('MessageRoom', {item, api: this.api})}
      leftAvatar={leftAvatar}
      title={item.name}
      subtitle={value}
      rightSubtitle={moment(timestamp).fromNow()}
    />
  }
  _renderFooter = () => <Footer onAddPress={() => console.log('add')} />

  render() {
    const { loading } = this.state;
    const { chats } = this.props;
    return (
      <Layout loading={false}>
        <FlatList 
          refreshing={loading}
          keyExtractor={(item,i) => i.toString()}
          renderItem={this._renderItem}
          data={chats}
          onRefresh={this._getChats}
          ListEmptyComponent={EmptyList}
          ListFooterComponent={this._renderFooter}
        />
      </Layout>
    );
  }
}

export default MessageList;