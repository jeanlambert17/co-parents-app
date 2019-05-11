import MyFamily from './my-family';
import { connect } from 'react-redux'

const mapStateToProps = ({child}) => ({
  children: child.children
});

export default connect(mapStateToProps)(MyFamily);