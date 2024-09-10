import { configureStore } from '@reduxjs/toolkit';
import userMessageReducer from './feature/userMessageSlice'
import userReducer from './feature/userSlice'

const store = configureStore({
  reducer: {
    "userMessage":userMessageReducer,
    "user": userReducer,
  },
});

export default store;