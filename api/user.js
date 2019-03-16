import { firestore, auth, storage } from "react-native-firebase";


export const updateUser = async(userId, userUpdated) => {
  const userRef = firestore().collection('user').doc(userId);
  try {
    const { fieldName, value } = userUpdated;
    if(fieldName == 'email') {
      const currentUser = auth().currentUser;
      await currentUser.updateEmail(value);
    }
    await userRef.update({
      [fieldName]: value
    });
    const user = await userRef.get();
    if(user.exists) 
      return [{ id: userId, ...user.data()}, null];
    else
      throw { message: 'Does not exist '};
  } catch(err) {
    return [null, { message: err.message || err}];
  }
}

export const updatePassword = async(newPassword) => {
  try {
    await auth().currentUser.updatePassword(newPassword)
    return ['Passsword was updated', null];
  } catch(err) {
    return [null, { message: err.message || err}];
  }
}

export const uploadIcon = async(userId) => {
  let fileName = 'name.png';
  const iconsRef = storage.ref(`'/user/'${userId}/icons/${fileName}`);
}


// task.on('state_changed', snapshot => {
//   let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log(percent)
// }, err => {
//     this.messageHandler.errorMessage(err);
// }, () => {
//   try {
//     const url = iconsRef.getDownloadURL();
//     const [user,err] = updateUser({fieldName:'icon', value: url});
//     if (err) throw err;
//     this.props.setUser(user);
//   } catch(err)  {
//     this.messageHandler.errorMessage(err);
//   }
// });


// uploadImage = async(uri,fileName,mime) => {
//   const id = this.props.user.id;
//   console.log(mime);
//   // return;
//   const uploadRef = storage().ref(`/user/${id}`).child('icon.jpg');
//   // return;
//   // const Blob = RNFetchBlob.polyfill.Blob
//   // const fs = RNFetchBlob.fs
//   // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
//   // window.Blob = Blob;

//   // const uploadURI = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//   const uploadURI = uri;
//   console.log('uploadUri: ' + uploadURI);
//   // const mime = 'image/jpg';
//   this.setState({loading:true})
//   try {
//     // const data = await fs.readFile(uploadURI, 'base64');
//     // const blob = await Blob.build(data, { type: `${mime};BASE64`});
//     // console.log(blob)
//     const res = await uploadRef.putFile(uploadURI, { contentType: mime });
//     console.log(res);
//     // .on('state_changed', snap => {
//     //   console.log(snap)
//     // }, err => {
//     //   throw err;
//     // })
//     // blob.close();
//     const url = await uploadRef.getDownloadURL();
//     const [user,err] = await updateUser(id, {fieldName:'icon', value:url});
//     if(err) throw err;
//     this.props.setUser(user);
//   } catch(err) {
//     this.messageHandler.errorMessage(err);
//   } finally {
//     this.setState({loading:false})
//   }