import { connect } from 'react-redux';
import MessageRoom from './message-room';
import { addMessage, setThread } from '../../redux/actions/messages';

const mapStateToProps = ({user,messages}) => ({
  user:user.user,
  chats: messages.chats,
})

const mapDispatchToProps = dispatch => ({
  addMessage: (id,message) => dispatch(addMessage(id,message)),
  setThread: (chat) => dispatch(setThread(chat))
});

export default connect(mapStateToProps,mapDispatchToProps)(MessageRoom);