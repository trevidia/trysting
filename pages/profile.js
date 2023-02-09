import Link from "next/link";
import Icon from "../components/Icon";
import {logout} from "../redux/features/auth/authSlice";
import {useRouter} from "next/router";
import {getSession, signOut} from "next-auth/react";
import axios, {axiosPrivate} from "../lib/axios";
import {getCookie} from "../lib/utils";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";


const Profile = ({unreadMessages, username}) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${username}`).then(()=>{
            toast('Copied', {type: 'default'})
        })
    }

    return (
            <div className={"w-9/12"}>
                <h2 className={"text-3xl text-center mb-5"}>Profile</h2>
                <h4 className={"text-xl text-zinc-400 mb-3"}>Welcome, {username}</h4>
                <div className={"text-zinc-400 mb-2 "}>
                    <p className={" mb-1"}>
                        Share link for co workers to leave critics or reviews for you
                    </p>
                    <div className={"flex justify-between items-center"}>
                        <span className={'truncate'}>{`${process.env.NEXT_PUBLIC_APP_URL}/${username}`}</span>
                        <span onClick={handleCopy} className={"h-6 w-6 flex justify-center items-center cursor-pointer"}>
                     <Icon name={"content_copy"}/>
                 </span>
                    </div>
                </div>
                <Link href={'/messages'}>
                    <div className={"profile-btn messages"}>
                        <div className={"relative mr-2"}>
                            <Icon name={"notifications"}/>
                            <span className={"absolute h-5 w-5 flex items-center justify-center z-30 right-0 top-0 bg-pink-400 p-2 rounded-full text-sm"}>{unreadMessages}</span>
                            <span className={"absolute h-5 w-5 right-0 z-20 top-0 bg-pink-400 rounded-full animate-ping"}></span>
                        </div>
                        <span className={"text-xl font-medium"}>
                  Messages
              </span>
                    </div>
                </Link>
                <Link href={"/settings"}>
                    <div className={"settings profile-btn"}>
                        <Icon name={"settings"}/>
                        <span className={"text-xl font-medium"}>
                      Settings
                  </span>
                    </div>
                </Link>
                <div className={"profile-btn logout text-zinc-700"} onClick={()=> {
                    dispatch(logout())
                    signOut({redirect: false}).then(()=>{
                        toast("Logged Out Success", {type: "success"})
                        router.push('/login')
                    })
                }}>
                    <Icon name={"logout"}/>
                    <span className={"text-xl font-medium"}>
                      Logout
                  </span>
                </div>
            </div>
        )
}

export default Profile

export const getServerSideProps = async ({req}) => {
    const session = await getSession({req})
   const cookie = getCookie(req)

    if (session === null){
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const res = await axiosPrivate.get('/users/profile', {
        headers: {
            Cookie: cookie
        }
    }).catch((err) => {})

    return {
        props: {
            username: res?.data?.username,
            unreadMessages: res?.data?.unReadMessages
        }
    }
}

