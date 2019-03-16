import { firestore, auth } from "react-native-firebase";

class Messages {
  constructor(user = null) {
    this.ref = firestore().ref('chat');
    this.user = user? user : auth().currentUser;
    this.id = user? this.user.id : this.user.uid;
  }

  _listenToChats() {
    
  }

}

export default Messages;