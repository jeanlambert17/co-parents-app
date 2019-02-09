import AddChild from './AddChild';
import { connect } from 'react-redux';
import { addChild, removeChild } from '../../redux/actions/child';

const mapDispatchToProps = dispatch => ({
  addChild: (child) => dispatch(addChild(child)),
  removeChild: (id) => dispatch(removeChild(id))
})

export default connect(null,mapDispatchToProps)(AddChild);