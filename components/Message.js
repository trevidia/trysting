import {useEffect, useRef, useState} from "react";

const Message = ({msg, date, readCallback}) => {
    const messageRef = useRef()
    const [read, setRead] = useState(msg.read)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (entry.isIntersecting){
                setRead(prevState => !prevState ? true : prevState)
            }
        }, {threshold: 1.0})

        observer.observe(messageRef.current)
    },[])

    useEffect(()=>{
        if (read && !msg.read){
            readCallback(msg.id)
        }
        console.log(`message with id: ${msg.id} ${read ? "has been" : "has not been"} read`)
    },[read])

    return <div
        ref={messageRef}
        className={"messages text-zinc-900 rounded-md px-2 py-3 mb-3"}>
        {
            msg.content
        }
        <div className={"flex justify-between items-center mt-3"}>
            <span className={"text-sm text-cyan-900"}>
                { date }
            </span>
            {
                read && <p>Read</p>
            }
        </div>

    </div>
}

export default Message