import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setMessages, setReadMessages} from "../redux/features/messages/messageSlice";
import axios from "../lib/axios";
import BackButton from "../components/BackButton";
import Message from "../components/Message";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import Spinner from "../components/Spinner";
import {getSession} from "next-auth/react";
import {getCookie} from "../lib/utils";


const Messages = ({messages}) => {
    const dispatch = useDispatch()
    const [readMsgList, setReadMsgList] = useState([])


    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController()

        const getIds = (msgList)=>{
            let ids = []
            msgList.forEach(msg => {
                if (readMsgList.includes(msg.id) && !msg.read){
                    ids.push(msg.id)
                }
            })
            return ids
        }

        const data = {
            ids: getIds(messages)
        }

        const markRead = async () => {


           try {
               const response = await axios.post('/messages/mark_read', data, {
                   signal: controller.signal
               })
               if (response && isMounted){
                   dispatch(setReadMessages({readMessages: readMsgList}))
               }
           } catch (e) {
               console.log(e)
           }
        }

        if (data.ids.length !== 0){
            markRead()
        }

        return ()=>{
            isMounted = false
            controller.abort()
        }
    }, [readMsgList])


  return (
      <div className={"w-9/12 h-full"}>
          <BackButton/>
          <h2 className={"text-3xl text-center mb-5"}>Messages</h2>
          <div className={"overflow-y-auto overflow-clip h-3/4 overscroll-none scrollbar "}>
              {
                  messages.map((msg, id)=>{
                      // for configuring how the date would look
                      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
                      const date = new Date(msg.created_at)
                      const minute = date.getMinutes().toString()
                      return <Message key={id} msg={msg} readCallback={(read)=> {setReadMsgList(prevState => [...prevState, read])}} date={`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${minute.length === 1 ? "0" + minute : minute}`}/>
                  })
              }
          </div>

      </div>
  )
}

export default Messages

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

    const res = await axios.get('/users/my_messages', {
        headers: {
            Cookie: cookie
        }
    })

    return {
        props: {
            messages: res?.data?.messages.reverse()
        }
    }
}
