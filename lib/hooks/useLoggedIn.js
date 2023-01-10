import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useEffect} from "react";

const useLoggedIn = ({routeLoggedIn, routeLoggedOut}) => {
    const user = useSelector(state => state.auth.user)
    const router = useRouter()
    let hasPushed = false
    useEffect(()=>{
        if (routeLoggedIn && user){
            router.push(routeLoggedIn).then(r => {
                hasPushed = r
            })
        } else if(routeLoggedOut && user === null){
            router.push(routeLoggedOut).then(r => {
                hasPushed = r
            })
        }

    },[user])

    return hasPushed
}

export default useLoggedIn