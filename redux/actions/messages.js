import { createReducer } from "../../utils/reduxHelpers";
import { ADD_MESSAGE, SET_CHATS, SET_MESSAGES } from '../const/messages';

const INITIAL_STATE = {
  chats: [
  //   {
  //   id: 0,
  //   firstname: 'John',
  //   lastname: 'Elio',
  //   icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  //   messages: [{
  //     me: true,
  //     text: 'Hello, how are you?',
  //     date: new Date()
  //   }, {
  //     me: false,
  //     text: 'HEEEEEEEEEEEEEEEY, hello??',
  //     date: new Date()
  //   }, {
  //     me: false,
  //     text: 'Are you there???',
  //     date: new Date()
  //   }, {
  //     me: true,
  //     text: 'Yes I am here',
  //     date: new Date()
  //   }, {
  //     me: false,
  //     text: 'HEEEEEEEEEEEEEEEY, hello??',
  //     date: new Date()
  //   }, {
  //     me: false,
  //     text: 'Are you there???',
  //     date: new Date()
  //   }, {
  //     me: true,
  //     text: 'Yes I am here',
  //     date: new Date()
  //   }]
  // }, {
  //   id: 1,
  //   firstname: 'Maria',
  //   lastname: 'Santo',
  //   icon: null,
  //   messages: [{
  //     me: true,
  //     text: 'Hi, how are you today?',
  //     date: new Date()
  //   }, {
  //     me: false,
  //     text: 'Hi! I am just fine, and you?',
  //     date: new Date()
  //   }]
  // }
  ]
}

export const messagesReducer = createReducer(INITIAL_STATE, {
  [SET_CHATS]: (state,action) => ({...state, chats: action.chats }),
  [ADD_MESSAGE]: (state,action) => ({...state, chats: state.chats.map(c => c.id === action.id? {...c, messages: [...c.messages, action.message]} : c)}),
  [SET_MESSAGES]: (state,action) => ({...state, chats: state.chats.map(chat => chat.id === action.chatId? {...chat, messages: action.messages } : chat)}),
});

export const addMessage = (id,message) => ({
  type: ADD_MESSAGE,
  id, message,
});

export const setChats = (chats) => ({
  type: SET_CHATS,
  chats,
});

export const setMessages = (chatId,messages) => ({
  type: SET_MESSAGES,
  chatId,
  messages
});