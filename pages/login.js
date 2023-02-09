import {useEffect, useState} from "react";
import Link from "next/link";
import BackButton from "../components/BackButton";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {authLogin} from "../redux/features/auth/authSlice";
import Spinner from "../components/Spinner";
import {getSession, signIn} from "next-auth/react";
import {toast} from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const res = await signIn('credentials', {
            username,
            password,
            redirect: false
        })
        setLoading(false)
        if (!res.error){
            toast('Success', {type: 'success'})
            router.push('/profile')
        } else {
            toast(res.error, {type: "error"})
        }
    }

    return (
        <div className={"w-full "}>
            <BackButton/>
            <form onSubmit={handleSubmit}>
                {
                    loading && <Spinner/>
                }
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
            </form>
        </div>
    )

}

export default Login

export const getServerSideProps = async ({req}) => {
    const session = await getSession({req})

    if (session !== null){
        return {
            redirect: {
                destination: '/profile',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}