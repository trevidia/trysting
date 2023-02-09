import {useRouter} from "next/router";
import axios from "../lib/axios";
import {useState} from "react";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";

const UserPage = ({username, available, userId}) => {
    const [content, setContent] = useState("")
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  // const {user} = router.query
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post('/messages', {
            user_id: userId,
            content
        }).then((res)=>{
            router.push('/')
            toast("Success", {type: "success"})
            setLoading(false)
        }).catch((err)=>{
            toast(err.response.data.message, {type: "error"})
            setLoading(false)
        })
    }
  return (
      <>
          {loading && <Spinner/>}
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
      </>
  )
}

export default UserPage

export const getServerSideProps = async ({req, res, params}) => {
    const response = await axios.get(`/users/${params.username}`)
    return {
        props: {
            username: response.data.username,
            available: response.data.available,
            userId: response.data.userId
        }
    }
}