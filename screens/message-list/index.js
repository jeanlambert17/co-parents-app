import { connect } from 'react-redux';
import MessageList from './message-list';
import { setChats, setMessages } from '../../redux/actions/messages';

const mapStateToProps = ({ messages, user }) => ({
  chats: messages.chats,
  user: user.user
});

const mapDispatchToProps = dispatch => ({
  setChats: chats => dispatch(setChats(chats)),
  setMessages: (chatId,messages) => dispatch(setMessages(chatId,messages))
});

export default connect(mapStateToProps,mapDispatchToProps)(MessageList);