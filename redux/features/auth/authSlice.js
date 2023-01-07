import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../lib/axios";


const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null

}

export const authLogin = createAsyncThunk('auth/login', ({username, password}) => {
    return axios.post('/login', {username, password}).then((res) => res.data)
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action){
            state.user = action.payload.user
            state.token = action.payload.accessToken
        }
    },
    extraReducers: builder => {
        builder.addCase(authLogin.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(authLogin.fulfilled, (state, action)=>{
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.accessToken
            state.error = ""
            console.log(state.user, state.token)
        })
        builder.addCase(authLogin.rejected, (state, action) => {
            state.loading = false
            state.user = {}
            state.token = ""
            state.error = action.error.message
        })
    }
})

export default authSlice.reducer
export const {setAuth} = authSlice.actions
