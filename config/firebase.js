import firebase from "firebase";

const config = {
  apiKey: " AIzaSyAVUL2S8SP_AcPq4XDHXfMteUqL8YC3EU4 ",
  authDomain: "co-parents-d88df.firebaseapp.com",
  databaseURL: "https://co-parents-d88df.firebaseio.com",
  storageBucket: "co-parents-d88df.appspot.com",
}

const settings = {
  timestampsInSnapshots: true
}

firebase.initializeApp(config);

export const database = firebase.firestore();
export const auth = firebase.auth();
export default firebase;