import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
}



const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages(state, action){
            state.messages = action.payload.messages
        },
        setReadMessages(state, action){
            const read = action.payload.readMessages
            state.messages = state.messages.map((msg)=> {
                if (read.includes(msg.id)){
                    return {...msg, read: true}
                } else {
                    return msg
                }
            })
        }
    }
})

export default messageSlice.reducer
export const {setMessages, setReadMessages} = messageSlice.actions