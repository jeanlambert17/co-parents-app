import { firestore, auth, storage } from "react-native-firebase";
import RNFS, { exists } from 'react-native-fs';

class Messages {
  constructor() {
    this.ref = firestore().collection('thread');
    this.user = auth().currentUser;
    this.id = this.user.uid;
    this.chats = [];
  }

  async getChat(chat) {
    try {
      const user = (await firestore().collection('user').doc(chat.userId).get()).data();
      return [{
        id: chat.id,
        userId: chat.userId,
        name: user.name,
        icon: user.icon,
        messages: []
      },null];
    } catch(err) {
      return [null,err];
    }
  }

  async getChats() {
    try {
      const chats = await this.ref.where(`users.${this.id}.active`, '==', true).get();
      let _chats = [];
      chats.forEach(res => {
        const chat = res.data();
        const users = chat.users;
        const keys = Object.keys(users);
        const key = (keys.filter(key => key !== this.id))[0];
        const user = users[key];
        _chats.push({
          id: res.id,
          userId: user.id,
          name: user.name,
          icon: user,
          mesages: []
        });
      });
      const batch = _chats.map(chat => {
        return this.getChat(chat);
      });
      _chats = await Promise.all(batch);
      _chats = _chats.map((chat) => chat[0]);
      this.chats = _chats;
      return [_chats,null];
    } catch(err) {
      return [null,err];
    }
  }

  async listenToChat(chatId, cb) {
    await this.ref.doc(chatId).collection('messages').orderBy('timestamp')
    .onSnapshot(async (snap) => {
      let messages = [], files = [];
      snap.forEach(async th => {
        const data = {
          ...th.data(),
          id: th.id
        }
        messages.push(data);
        if(data.type === 'file') {
          files.push({
            ...data,
            i: messages.length - 1,
          })
        }
      });
      const existsAll = files.map((file) => {
        return RNFS.exists(this.getDownloadURI(file.value));
      })
      const filesDidExists = await Promise.all(existsAll);
      files.forEach((file,index) => {
        messages[file.i] = {
          ...messages[file.i],
          exists: filesDidExists[index]
        }
      });
      cb(chatId,messages);
    });
  }

  async listenToChats(cb) {
    this.chats.forEach(chat => {
      this.listenToChat(chat.id, cb);
    });
  }

  async sendMessage(chatId,message,cb) {
    try {
      let _message = {
        ...message,
        new: true,
        timestamp: new Date()
      }
      const data = await this.ref.doc(chatId).collection('messages').add(_message);
      setTimeout(() => {
        cb(_message)
      }, 250);
      return data.id;
    } catch(err) {
      return [null,err];
    }
  }

  sendFile(chatId, file, snap, error, success) {
    const {uri,fileName,type} = file;
    const filename = `${Date.now()}-${fileName}`;
    const uploadRef = storage().ref(`/chat/${chatId}`).child(filename);
    const unsubscribe = uploadRef.putFile(uri, { contentType: type })
    .on(storage.TaskEvent.STATE_CHANGED, snapshot => {
      snap(snapshot)
    }, err => {
      unsubscribe();
      error(err);
    }, async uploaded => {
      unsubscribe();
      const url = await uploadRef.getDownloadURL();
      const message = {
        type:'file',
        mime: type,
        url,
        value: filename,
        from: this.id
      }
      this.sendMessage(chatId, message, (res) => {
        success(res);
      });
    });
  }

  async downloadFile(chatId, filename, snap, error, success) {
    const path = this.getDownloadURI(filename);
    const downloadRef = storage().ref(`/chat/${chatId}`).child(filename);
    const subscribe = downloadRef.downloadFile(path);
    const unsubscribe = subscribe.on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const {totalBytes,bytesTransferred} = snapshot;
        snap(bytesTransferred === 0? bytesTransferred:totalBytes/bytesTransferred);
    })
    subscribe.then(() => {
      unsubscribe();
      success(path);
    }).catch(err => {
      unsubscribe();
      error(err.message || err);
    });
  }

  getDownloadURI(filename) {
    return `${storage.Native.EXTERNAL_STORAGE_DIRECTORY_PATH}/Download/coParents/${filename}`;
  }
}

export default Messages;