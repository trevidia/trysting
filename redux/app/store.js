import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import messageReducer from "../features/messages/messageSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        messages: messageReducer
    },
    devTools: true
})

export default store