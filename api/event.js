import { firestore } from "react-native-firebase";

export const deleteEvent = async (userId,eventId) => {
  const userRef = firestore().collection('user').doc(userId);
  try {
    await userRef.collection('event').doc(eventId).delete();
    return [eventId,null];
  } catch(err) {
    return [null, { message: err.message || err }];
  }
}

export const createEvent = async (userId,event) => {
  const userRef = firestore().collection('user').doc(userId);

  try {
    const data = await userRef.collection('event').add(event);
    if(data) {
      return [{
        id: data.id,
        ...event,
      }, null]
    } else {
      return [null,{message: 'Could not retreive any data'}];
    }
  } catch(err) {
    return [null, { message: err.message || err }];
  }
}

export const updateEvent = async (userId,event) => {
  const userRef = firestore().collection('user').doc(userId);

  try {
    const id = event.id;
    await userRef.collection('event').doc(id).update({
      name:event.name,
      allDay: event.allDay,
      start: event.start,
      end: event.end,
      location:event.location,
      children:event.children,
      note:event.note,
      // repeat:'',
      isPrivate:event.isPrivate,
      interval:event.interval
    });
    return [id,null];
  } catch(err) {
    return [null, { message: err.message || err }];
  }
}

export const getEvents = async (userId,ref = null) => {
  let userRef;
  if(ref)
    userRef = ref;
  else 
    userRef = firestore().collection('user').doc(userId);
  try {
    const data = await userRef.collection('event').get();
    let events = [];
    if(data) {
      data.forEach(evt => {
        events.push({
          id: evt.id,
          ...evt.data()
        });
      });
      return [events, null]
    } else {
      return [null,{message: 'Could not retreive any data'}];
    }
  } catch(err) {
    return [null, { message: err.message || err }];
  }
}