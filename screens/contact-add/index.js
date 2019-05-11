import { connect } from 'react-redux';
import ContactAdd from './contact-add';
import { addContact } from '../../redux/actions/contact';

const mapStateToProps = ({contact}) => ({
  contacts:contact.contacts
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => dispatch(addContact(contact))
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactAdd);