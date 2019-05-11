import Calendar from './calendar';
import { connect } from 'react-redux';
import { addEvent, updateEvent, setEvent, removeEvent, setEvents } from '../../redux/actions/event';
import { setChildren } from '../../redux/actions/child';
import { setCoParents } from '../../redux/actions/parent';

const mapStateToProps = ({ event, user }) => ({
  user: user.user,
  events: event.events,
  event: event.event
});

const mapDispatchToProps = dispatch => ({
  addEvent: () => dispatch(addEvent()),
  updateEvent: () => dispatch(updateEvent()),
  setEvent: (evt) => dispatch(setEvent(evt)),
  setBasicData: ({ children, coParents, events }) => {
    dispatch(setEvents(events));
    dispatch(setChildren(children));
    dispatch(setCoParents(coParents));
  }
}) 

export default connect(mapStateToProps,mapDispatchToProps)(Calendar)