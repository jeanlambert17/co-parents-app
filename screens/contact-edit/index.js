import { connect } from 'react-redux';
import ContactEdit from './contact-edit';
import { removeContact } from '../../redux/actions/contact';

const mapDispatchToProps = dispatch => ({
  removeContact: id => dispatch(removeContact(id))
})

export default connect(null,mapDispatchToProps)(ContactEdit);