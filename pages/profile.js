import Link from "next/link";
import {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import useAxiosPrivate from "../lib/hooks/useAxiosPrivate";


const Profile = () => {
    const user = useSelector(state => state.auth.user)
    const axiosPrivate = useAxiosPrivate()
    const [messageCount, setMessageCount] = useState(0)
    const [url, setUrl] = useState("")


    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController()

        const getProfileContent = async ()=>{
            try {
                const response = await axiosPrivate.get('/users/profile', {
                    signal: controller.signal
                })
                console.log(response.data)
                const {unReadMessages, username} = response.data
                console.log(user)
                isMounted && setUrl(`${process.env.APP_URL}/${username}`)
                isMounted && setMessageCount(unReadMessages)
            } catch (err){
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

  return (
      <div className={"w-9/12"}>
          <h2 className={"text-3xl text-center mb-5"}>Profile</h2>
          <h4 className={"text-xl text-zinc-400 mb-3"}>Welcome, {user?.username}</h4>
          <div className={"text-zinc-400 mb-2 "}>
              <p className={" mb-1"}>
                  Share link for people to leave cute messages for you
              </p>
             <div className={"flex justify-between"}>
                 <span>{url}</span>
                 <span onClick={handleCopy} className={"material-symbols-rounded h-8 w-8 cursor-pointer"}>content_copy</span>
             </div>
          </div>
          <Link href={'/messages'}>
              <div className={"profile-btn messages"}>
                  <div className={"relative mr-2"}>
                      <span className={"material-symbols-rounded material"}>notifications</span>
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
                  <span className={"material-symbols-rounded material"}>settings</span>
                  <span className={"text-xl font-medium"}>
                      Settings
                  </span>
              </div>
          </Link>
              <div className={"profile-btn logout text-zinc-700"}>
                  <span className="material-symbols-rounded material">
                      logout
                  </span>
                  <span className={"text-xl font-medium"}>
                      Logout
                  </span>
              </div>
      </div>
  )
}

export default Profile
