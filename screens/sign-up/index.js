import SignUp from './sign-up';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(null,mapDispatchToProps)(SignUp);