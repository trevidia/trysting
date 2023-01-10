import Link from "next/link";
import {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import useAxiosPrivate from "../lib/hooks/useAxiosPrivate";
import Icon from "../components/Icon";
import useLoggedIn from "../lib/hooks/useLoggedIn";
import Spinner from "../components/Spinner";


const Profile = () => {
    const user = useSelector(state => state.auth.user)
    const axiosPrivate = useAxiosPrivate()
    const [messageCount, setMessageCount] = useState(0)
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(true)
    // const hasPushed = useLoggedIn({routeLoggedOut: '/login'})


    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController()

        const getProfileContent = async ()=>{
            try {
                setLoading(true)
                const response = await axiosPrivate.get('/users/profile', {
                    signal: controller.signal
                })
                setLoading(false)
                console.log(response.data)
                const {unReadMessages, username} = response.data
                console.log(user)
                isMounted && setUrl(`${process.env.NEXT_PUBLIC_APP_URL}/${username}`)
                isMounted && setMessageCount(unReadMessages)
            } catch (err){
                setLoading(false)
                console.error(err)
            }
        }
        getProfileContent()
        return ()=>{
            isMounted = false
            controller.abort()
        }

    },[])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url)
    }

    if (loading){
        return <Spinner/>
    } else {
        return (
            <div className={"w-9/12"}>
                <h2 className={"text-3xl text-center mb-5"}>Profile</h2>
                <h4 className={"text-xl text-zinc-400 mb-3"}>Welcome, {user?.username}</h4>
                <div className={"text-zinc-400 mb-2 "}>
                    <p className={" mb-1"}>
                        Share link for people to leave cute messages for you
                    </p>
                    <div className={"flex justify-between items-center"}>
                        <span>{url}</span>
                        <span onClick={handleCopy} className={"h-6 w-6 flex justify-center items-center cursor-pointer"}>
                     <Icon name={"content_copy"}/>
                 </span>
                    </div>
                </div>
                <Link href={'/messages'}>
                    <div className={"profile-btn messages"}>
                        <div className={"relative mr-2"}>
                            <Icon name={"notifications"}/>
                            <span className={"absolute h-5 w-5 flex items-center justify-center z-30 right-0 top-0 bg-pink-400 p-2 rounded-full text-sm"}>{messageCount}</span>
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
                <div className={"profile-btn logout text-zinc-700"}>
                    <Icon name={"logout"}/>
                    <span className={"text-xl font-medium"}>
                      Logout
                  </span>
                </div>
            </div>
        )
    }
}

export default Profile

