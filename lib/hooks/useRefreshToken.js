import {useDispatch} from "react-redux";
import axios from "../axios";
import {setAuth} from "../../redux/features/auth/authSlice";

const useRefreshToken = ()=> {
    const dispatch = useDispatch()

    return async () => {
        const response = await axios.get('/refresh', {withCredentials: true})
        dispatch(setAuth({accessToken: response.data.accessToken, user: response.data.user}))
        return response.data.accessToken
    }
}

export default useRefreshToken