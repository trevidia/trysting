import {useEffect, useState} from "react";
import Link from "next/link";
import BackButton from "../components/BackButton";
import {useDispatch, useSelector} from "react-redux";
import {authRegister} from "../redux/features/auth/authSlice";
import {useRouter} from "next/router";

const Register = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const router = useRouter()

    useEffect(()=>{
        if (auth.user){
            router.push('/profile')
        }
    }, [auth])

    return (
        <div className={"w-full overflow-y-auto scrollbar"}>
            <form onSubmit={(e)=>{
                e.preventDefault()
                dispatch(authRegister({email, username, password}))
            }}>
                <BackButton/>
                <h3 className={"text-3xl text-center mb-5"}>Register</h3>
                <div className={"flex flex-col w-full mb-5"}>
                <span className={"text-xl mb-3"}>
                    Email
                </span>
                    <input
                        className={"input"}
                        type={"email"} required={true} value={email} onChange={(event) => {
                        setEmail(event.target.value)
                    }}/>
                </div>
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
                <div className={"flex flex-col w-full mb-5"}>
                <span className={"text-xl mb-2.5"}>
                    Password
                </span>
                    <input
                        className={"input"}
                        type={"password"} required={true} value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                </div>
                <div className={"text-right mb-2.5"}>
                    Have an account already? <span className={' text-cyan-700'}><Link href={"login"}> Sign In</Link></span>
                </div>
                <button className={'btn w-full'}>
                    Submit
                </button>
                {auth.error && <div className={"text-center mt-1.5 text-red-500"}>{auth.error}</div>}
            </form>
        </div>
    )
}

export default Register