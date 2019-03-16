import { auth, firestore } from "react-native-firebase";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import permissions from "../constants/permissions";
import { getEvents } from "./event";
import { getCoParents } from "./coparent";
import { getChildren } from "./child";

export const loginWithFacebook = async () => {
  try {  
    const logIn = await LoginManager.logInWithReadPermissions(permissions);
    if (logIn.isCancelled) {
      return [null, 'Login cancelleed'];
    }
  
    const tokenData = await AccessToken.getCurrentAccessToken();
    const credentials = auth.FacebookAuthProvider.credential(tokenData.accessToken);
    const userCredentials = await auth().signInWithCredential(credentials);
    const user = userCredentials.user.toJSON();
    const userRef = firestore().collection('user');

    if(user) {
      const { uid } = user;
      const data = {
        email: user.email,
        icon: user.photoURL,
        phoneNumber: user.phoneNumber,
        name: user.displayName,
        lastSignInTime: user.metadata.lastSignInTime
      }
      await userRef.doc(uid).set(data);

      let info = {
        children: [],
        coParents: [],
        events: []
      };
      if(user.lastSignInTime !== null) {
        const [res, err] = await getBasicData(uid);
        if(err) throw err;
        info = res;
      }
      return [{
        user: {
          id: uid,
        ...data
        },
        info,
        token: tokenData.accessToken
      }, null];
    } else {
      return [null, 'User data not retreive'];
    }
  } catch (err) {
    return [null,err.message || 'Was not able to log in with facebook API'];
  }
}

export const signUp = async ({email,password,name,phoneNumber}) => {
  const ref = firestore().collection('user');
  try {
    let { user } = await auth().createUserWithEmailAndPassword(email,password);
    if(user) {
      user = user._auth._user._user;
      const _user = {
        email: user.email,
        icon: null,
        phoneNumber: phoneNumber,
        name: name,
        lastSignInTime: null
      }
      await ref.doc(user.uid).set(_user);
      return {
        id:user.uid,
        ..._user
      }
    } else {
      return null;
    }
  } catch(err) {
    throw { 
      message: err.message,
      code: err.code
    };
  }
}

export const loginWithEmailAndPassword = async (email,password) => {
  const ref = firestore().collection('user');
  try {
    let {user} = await auth().signInWithEmailAndPassword(email,password);
    user = user._auth._user;
    if (user) {
      const _user = (await ref.doc(user.uid).get()).data();
      const [info,err] = await getBasicData(user.uid);
      if(err) throw err;
      return {
        user: {
          ..._user,
          id: user.uid
        },
        info
      }
    }
    else  
      return null;
  } catch(err) {
    throw err;
  }
}

export const fillForm = async (userId,children,coparent) => {
  const ref = firestore().collection('user').doc(userId);
  const batch = firestore().batch();
  const chilrendRef = ref.collection('child');
  const coparentRef = ref.collection('coparent').doc();
  batch.set(coparentRef,coparent);
  children.forEach(child => {
    const childRef = chilrendRef.doc();
    batch.set(childRef,child);
  });
  try {
    await batch.commit();
  } catch(err) {
    throw err;
  }
  try {
    const [fetchChildren, childrenErr] = await getChildren(userId, ref);
    const [fetchCoparents, coparentErr] = await getCoParents(userId, ref);
    // Should do the same with children and coparents
    const [events, eventsErr] = await getEvents(userId, ref);

    // const _children = [], _coparent = [];
    // fetchChildren.forEach(c => {
    //   _children.push({
    //     id: c.id,
    //     ...c.data()
    //   });
    // });
    // fetchCoparents.forEach(c => {
    //   _coparent.push({
    //     id: c.id,
    //     ...c.data()
    //   });
    // })
    if(!childrenErr && !coparentErr && !eventsErr) {
      return {
        children:fetchChildren,
        coParents:fetchCoparents,
        // events added
        events
      }
    } else {
      throw {message: 'Error getting the data'};
    }
  } catch(err) {
    throw err;
  }
}

export const getBasicData = async (userId) => {
  const userRef = firestore().collection('user').doc(userId);
  try {
    const [children, childrenErr] = await getChildren(userId, userRef);
    const [coParents, coParentsErr] = await getCoParents(userId, userRef);
    const [events, eventsErr] = await getEvents(userId, userRef);
    if(!childrenErr && !coParentsErr && !eventsErr) {
      return [{
        children,
        coParents,
        events
      },null];
    } else {
      return [null,{message: 'Error getting the data'}];
    }
  } catch(err) {
    return [null, {message: err.message || err}];
  }
}