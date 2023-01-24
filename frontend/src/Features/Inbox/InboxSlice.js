import { createSlice } from '@reduxjs/toolkit'

const InboxSlice = createSlice({
  name: 'auth',
  initialState: {
    chats: [],
    chatsInitialized: false
  },
  reducers: {
    setChats: (state, action) => {
        state.chats = action.payload.chats;
        state.chatsInitialized = true;
    },
    addMessage: (state, action) => {
      const newChats = state.chats;
      newChats.forEach(chat=>{
        if (chat.id == action.payload.id) {
          chat.messages.push(action.payload.message);
          return;
        }
      })
      state.chats = newChats;
    }
  }
})

export const { setChats, addMessage } = InboxSlice.actions

export default InboxSlice.reducer
