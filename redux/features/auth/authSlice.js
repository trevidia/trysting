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

export const authRegister = createAsyncThunk('auth/register', ({email, username, password})=>{
    return axios.post('/register', {username, email, password}).then(res => res.data).catch(err => {
        throw new Error(err.response.data.message)
    })
})

function loadingReducer(state){
    state.loading = true
}

function loginReducer(state, action){
    state.loading = false
    state.user = action.payload.user
    state.token = action.payload.accessToken
    state.error = ""
    console.log(state.user, state.token)
}

function loginFailedReducer (state, action){
    state.loading = false
    state.user = null
    state.token = ""
    console.log(action)
    state.error = action.error.message
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action){
            state.user = action.payload.user
            state.token = action.payload.accessToken
        },
        logout(state){
            state.user = null
            state.token = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: builder => {
        builder.addCase(authLogin.pending, loadingReducer)
        builder.addCase(authLogin.fulfilled, loginReducer)
        builder.addCase(authLogin.rejected, loginFailedReducer)
        builder.addCase(authRegister.pending, loadingReducer)
        builder.addCase(authRegister.fulfilled, loginReducer)
        builder.addCase(authRegister.rejected, loginFailedReducer)
    }
})

export default authSlice.reducer
export const {setAuth, logout} = authSlice.actions
