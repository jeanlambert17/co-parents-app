import {
  ToastAndroid,
  Platform
} from 'react-native';

class MessageHandler {
  constructor() {
    // this.platform = Platform.os();
  }

  errorMessage = (message) => ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  centerMessage = (message) => ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
}

export const toast = new MessageHandler();
export default MessageHandler;