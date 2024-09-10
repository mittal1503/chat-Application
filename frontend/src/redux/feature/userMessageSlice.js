import {createSlice} from '@reduxjs/toolkit'

const userMessageSlice = createSlice({
    name: 'userMessage',
    initialState: {
        messages: [],
        message:''
    },
    reducers: {
        setMessages: (state, action) => {
            console.log("action.payload", action.payload);
            state.messages.push(action.payload);
        },
        clearMessage: (state) => {
            state.message = '';
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    }
})

export const {setMessage, clearMessage,setMessages } = userMessageSlice.actions;

export default userMessageSlice.reducer;