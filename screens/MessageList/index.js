import { connect } from 'react-redux';
import MessageList from './MessageList';
// import { orderAlphabetically } from '../../redux/actions/contact';

const mapStateToProps = ({ message }) => ({
  chats: message.chats
})

export default connect(mapStateToProps)(MessageList);