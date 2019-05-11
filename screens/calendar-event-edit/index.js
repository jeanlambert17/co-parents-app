import { connect } from 'react-redux';
import EditEventScreen from './edit-event';
import { removeEvent, setEvent } from '../../redux/actions/event';

const mapStateToProps = ({child, user }) => ({
  children: child.children,
  user: user.user
})
const mapDispatchToProps = dispatch => ({
  removeEvent: (id) => dispatch(removeEvent(id)),
  setEvent: evt => dispatch(setEvent(evt))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEventScreen)