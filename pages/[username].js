import {useRouter} from "next/router";
import axios from "../lib/axios";
import {useState} from "react";

const UserPage = ({username, available, userId}) => {
    const [content, setContent] = useState("")
    const router = useRouter()
  // const {user} = router.query
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/messages', {
            user_id: userId,
            content
        }).then((res)=>{
            router.push('/')
        })
    }
  return (
      <div className={"w-9/12"}>
          {
              available ? <form className={"h-full"} onSubmit={handleSubmit}>
                  <h2 className={"text-3xl mb-5"}>
                      Write a message for {username}
                  </h2>
                  <textarea onChange={(e)=>setContent(e.target.value)} value={content} className={"input h-1/3 resize-none mb-5"} maxLength={255}/>
                  <button className={"btn w-full"}>
                      Post message
                  </button>
              </form> : <>
              <p>The user {username} is not available</p>
              </>
          }
      </div>
  )
}

export default UserPage

export const getServerSideProps = async ({req, res, params}) => {
    console.log(params)
    const response = await axios.get(`/users/${params.username}`)
    console.log("fish")
    return {
        props: {
            username: response.data.username,
            available: response.data.available,
            userId: response.data.userId
        }
    }
}