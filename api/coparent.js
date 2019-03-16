import { firestore } from "react-native-firebase";

export const getCoParents = async (userId,ref = null) => {
  let userRef;
  if(ref)
    userRef = ref;
  else 
    userRef = firestore().collection('user').doc(userId);
  try {
    const data = await userRef.collection('coparent').get();
    let coparent = [];
    if(data) {
      data.forEach(evt => {
        coparent.push({
          id: evt.id,
          ...evt.data()
        });
      });
      return [coparent, null]
    } else {
      return [null,{message: 'Could not retreive any data'}];
    }
  } catch(err) {
    return [null, { message: err.message || err }];
  }
}