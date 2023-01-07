import {useEffect, useState} from "react";
import Link from "next/link";
import BackButton from "../components/BackButton";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {authLogin} from "../redux/features/auth/authSlice";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(()=>{
        if (auth.user !== null){
            router.push('/profile').then(r => console.log(r))
        }
    }, [auth.user])

    return (
        <div className={"w-full "}>
            <BackButton/>
            <form onSubmit={async (e) => {
                e.preventDefault()
                console.log({username, password})
                dispatch(authLogin({username, password}))
            }}>
                <h3 className={"text-3xl text-center mb-5"}>Login</h3>
                <div className={"flex flex-col w-full mb-5"}>
                <span className={"text-xl mb-3"}>
                    Username
                </span>
                    <input
                        className={"input"}
                        type={"text"} required={true} value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }}/>
                </div>
                <div className={"flex flex-col w-full mb-2.5"}>
                <span className={"text-xl mb-3"}>
                    Password
                </span>
                    <input
                        className={"input"}
                        type={"password"} required={true} value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                </div>
                <div className={'text-right mb-2.5'}>
                    Don't have an account yet?
                    <Link href={"/register"}>
                        <span className={"text-cyan-700"}> Register</span>
                    </Link>
                </div>
                <button className={'btn w-full'}>
                    Submit
                </button>
                {auth.error && <div className={"text-center mt-1.5 text-red-500"}>{auth.error}</div>}
            </form>
        </div>
    )

}

export default Login