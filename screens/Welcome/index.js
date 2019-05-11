import Welcome from './welcome';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import { setEvents } from '../../redux/actions/event';
import { setChildren } from '../../redux/actions/child';
import { setCoParents } from '../../redux/actions/parent';
import { setFacebookType } from '../../redux/actions/auth';

const mapDispatchToProps = dispatch => ({
  setUser: user => {
    dispatch(setUser(user)),
    dispatch(setFacebookType())
  },
  setData: ({ children, coParents, events }) => {
    dispatch(setEvents(events));
    dispatch(setChildren(children));
    dispatch(setCoParents(coParents));
  }
});

export default connect(null,mapDispatchToProps)(Welcome);