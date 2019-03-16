import Welcome from './Welcome';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import { setEvents } from '../../redux/actions/event';
import { setChildren } from '../../redux/actions/child';
import { setCoParents } from '../../redux/actions/parent';
import { setFacebookType } from '../../redux/actions/auth';
// import { setToken } from '../../redux/actions/auth';

// const mapStateToProps = ({ auth }) => ({
// });

const mapDispatchToProps = dispatch => ({
  setUser: user => {
    dispatch(setUser(user)),
    dispatch(setFacebookType())
  },
  // setToken: token => dispatch(setToken(token)),
  // setAuth: (user,token) => {
  //   dispatch(setUser(user));
  //   dispatch(setToken(token));
  // }
  setData: ({ children, coParents, events }) => {
    dispatch(setEvents(events));
    dispatch(setChildren(children));
    dispatch(setCoParents(coParents));
  }
});

export default connect(null,mapDispatchToProps)(Welcome);