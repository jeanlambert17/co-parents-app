import Profile from './profile';
import { connect } from 'react-redux'
import { setUser } from '../../redux/actions/user';

const mapStateToProps = ({ user, auth }) => ({
  user: user.user,
  loginType: auth.loginType
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);