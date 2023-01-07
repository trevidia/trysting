import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setMessages, setReadMessages} from "../redux/features/messages/messageSlice";
import useAxiosPrivate from "../lib/hooks/useAxiosPrivate";
import BackButton from "../components/BackButton";
import Message from "../components/Message";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";


const Messages = () => {
    const messages = useSelector(state => state.messages.messages)
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const [readMsgList, setReadMsgList] = useState([])


    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController()

        const getMessages = async ()=>{
            try {
                const response = await axiosPrivate.get('/users/my_messages', {
                    signal: controller.signal
                })

                isMounted && dispatch(setMessages({messages: response.data.messages.reverse()}))
            } catch (err){
                console.error(err)
            }
        }
        // console.log(messages)
        getMessages()

        return ()=>{
            isMounted = false
            controller.abort()
        }

    },[])

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController()
        console.log(readMsgList, "msg list")

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
               const response = await axiosPrivate.post('/messages/mark_read', data, {
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
                      return <Message key={id} msg={msg} readCallback={(read)=> {setReadMsgList(prevState => [...prevState, read])}} date={`${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${minute.length === 1 ? "0" + minute : minute}`}/>
                  })
              }
          </div>

      </div>
  )
}

export default Messages