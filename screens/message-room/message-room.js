import React, { Component } from 'react';
import HeaderTitle from './components/header-title';
import Layout from './components/layout';
import TextEntry from './components/comment-entry';
import FileEntry from './components/file-entry';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import MessageHandler from '../../utils/message-handler';
import FileViewer from 'react-native-file-viewer';

class MessageRoom extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle {...navigation.getParam('item', {})}/>
  });

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      data: {},
      text: '',
      chatId: '',
      downloading: null,
      uploading: false,
      progress: 0,
    }
    this.scroll = null;
    this.messageHandler = new MessageHandler();
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { messages, ...data } = navigation.getParam('item', {});
    const api = navigation.getParam('api', null);
    this.api = api;
    this.setState({ chatId: data.id });
    setTimeout(() => {
      this._scrollToEnd();
    }, 500)
  }

  handleSend = async () => {
    const message = {
      type:'text',
      value: this.state.text,
      from: this.props.user.id
    }
    this.setState({text:''});
    this.api.sendMessage(this.state.chatId, message, (res) => {
      this._scrollToEnd();
    });
  }

  _scrollToEnd = () => this.scroll.scrollToEnd({ animated: true, duration: 750 });
  showDocumentPicker = () => {
    DocumentPicker.show({
      filetype:[DocumentPickerUtil.allFiles()]
    }, (err,file) => {
      if(err) {
        this.messageHandler.errorMessage(err.message || err);
        return;
      }
      this.setState({uploading:true});
      this.api.sendFile(this.state.chatId, file, (snap) => {
        console.log(snap);
        // this.setState({progress:snap});
      }, error => {
        this.setState({uploading:false,progress:0});
        console.log('err')
        console.log(error)
      }, uploaded => {
        this.setState({uploading:false,progress:0});
        console.log('success')
        console.log(uploaded)
      });
    });
  }

  downloadFile = async(filename) => {
    this.setState({downloading:filename});
    try {
      await this.api.downloadFile(this.state.chatId, filename, snap => {
        console.log(snap);
      }, err => {
        console.log(err);
        this.setState({downloading:null});
      }, (path) => {
        this.openFile(path);
        this.setState({downloading:null});
      });
    } catch(err) {
      this.messageHandler.errorMessage(err);
    }
  }

  openFile = async (path) => {
    try {
      await FileViewer.open(path);
      return;
    } catch(err) {
      this.messageHandler.errorMessage(err.message || err);
    }
  }

  render() {
    const { chats } = this.props;
    const { chatId, text, downloading, uploading, progress } = this.state;
    const filteredChat = chats.filter(chat => chat.id === chatId);
    let chat = null, messages = [];
    if(filteredChat.length > 0){
      chat = filteredChat[0];
      messages = filteredChat[0].messages;
    }

    return (
      <Layout
        scrollRef={(scroll) => this.scroll = scroll}
        text={text}
        onChangeText={(text) => this.setState({text})}
        onAttachmentPress={this.showDocumentPicker}
        onSendPress={this.handleSend}
        uploading={uploading}
        progress={progress}
      >
        {messages.map((th,i) => {
          let me = th.from === this.props.user.id;
          const props = {
            key: i,
            ...th,
            title: me? 'ME' : chat.name[0].toUpperCase(),
            icon: me? this.props.user.icon : chat.icon,
            me
          }
          if(th.type === 'text')
            return <TextEntry {...props} />
          else {
            return (
              <FileEntry {...props } downloading={downloading} 
                onPress={th.exists 
                  ? () => this.openFile(this.api.getDownloadURI(th.value))
                  : () => this.downloadFile(th.value)}
              />
            );
          }
            
        })}
      </Layout>
    )
  }
}

export default MessageRoom;