import { firestore } from "react-native-firebase";

export const getChildren = async (userId,ref = null) => {
  let userRef;
  if(ref)
    userRef = ref;
  else 
    userRef = firestore().collection('user').doc(userId);
  try {
    const data = await userRef.collection('child').get();
    let children = [];
    if(data) {
      data.forEach(evt => {
        children.push({
          id: evt.id,
          ...evt.data()
        });
      });
      return [children, null]
    } else {
      return [null,{message: 'Could not retreive any data'}];
    }
  } catch(err) {
    return [null, { message: err.message || err }];
  }
}