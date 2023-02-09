import {getSession, useSession} from "next-auth/react";
import Icon from "../components/Icon";
import BackButton from "../components/BackButton";
import {useEffect, useState} from "react";
import username from "./[username]";
import axios from "../lib/axios";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import {usernameValidation} from "../lib/utils";

const Settings = () => {
    const [settings, setSettings] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [edit, setEdit] = useState('')
    const {data: session} = useSession()
    const [loading, setLoading] = useState(false)

    switch (edit) {
        case "username":
            return (
                <>
                    {
                        loading && <Spinner/>
                    }
                    <div className={'w-9/12'}>
                        <BackButton/>
                        <h3 className={"text-3xl text-center mb-5"}>
                            Settings
                        </h3>
                        <div className={'mb-3'}>
                            <h4 className={"mb-2"}>
                                Username
                            </h4>
                            <input
                                type={'text'}
                                className={'input'}
                                onChange={(e)=>setSettings({...settings, username: e.target.value})}
                                value={settings.username}
                            />
                        </div>
                        <div className={"flex gap-3"}>
                            <button
                                className={'btn rounded-md'}
                                onClick={()=>{
                                    if (!usernameValidation(settings.username)){
                                        toast('Invalid Username, Input a valid username', {type: "warning"})
                                    } else {
                                        setLoading(true)
                                        axios.post(`/users/${session.user.id}/username`, {username: settings.username})
                                            .then((res)=>{
                                                toast(res.data.message, {type: "success"})
                                                setLoading(false)
                                                setSettings({...settings, username: ""})
                                                setEdit('')
                                            })
                                            .catch((err)=> {
                                                console.log(err)
                                                toast(err.response.data.message, {type: "error"})
                                                setLoading(false)
                                            })
                                    }
                                }}
                            >
                                Submit
                            </button>
                            <button className={'btn bg-red-500 text-white rounded-md'} onClick={()=> {
                                setEdit("")
                                setSettings(prevState => {
                                    return{...prevState, username: ""}
                                })
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )
        case "password":
            return (
                <>
                    {
                        loading && <Spinner/>
                    }
                    <div className={'w-9/12'}>
                        <BackButton/>
                        <h3 className={"text-3xl text-center mb-5"}>
                            Settings
                        </h3>
                        <div className={'mb-3'}>
                            <h4 className={"mb-2"}>
                                Password
                            </h4>
                            <input type={'password'} className={'input'} onChange={(e)=>setSettings({...settings, password: e.target.value})} value={settings.password}/>
                        </div>
                        <div className={"flex gap-3"}>
                            <button
                                className={'btn rounded-md'}
                                onClick={()=>{
                                    setLoading(true)
                                    axios.post(`/users/${session.user.id}/password`, {password: settings.password})
                                        .then((res)=>{
                                            toast(res.data.message, {type: "success"})
                                            setLoading(false)
                                            setSettings(prevState => {
                                                return{...prevState, password: ""}
                                            })
                                            setEdit('')
                                        })
                                        .catch((err)=> {
                                            toast(err.message, {type: "error"})
                                            setLoading(false)
                                        })
                                }}
                            >
                                Submit
                            </button>
                            <button className={'btn bg-red-500 text-white rounded-md'} onClick={()=> {
                                setEdit("")
                                setSettings(prevState => {
                                    return{...prevState, password: ""}
                                })
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )
        case "email":
            return (
                <>
                    {loading && <Spinner/>}
                    <div className={'w-9/12'}>
                        <BackButton/>
                        <h3 className={"text-3xl text-center mb-5"}>
                            Settings
                        </h3>
                        <div className={'mb-3'}>
                            <h4 className={"mb-2"}>
                                Email
                            </h4>
                            <input type={'email'} className={'input'} onChange={(e)=>setSettings({...settings, email: e.target.value})} value={settings.email}/>
                        </div>
                        <div className={"flex gap-3"}>
                            <button
                                className={'btn rounded-md'}
                                onClick={()=>{
                                    setLoading(true)
                                    axios.post(`/users/${session.user.id}/email`, {email: settings.email})
                                        .then((res)=>{
                                            toast(res.data.message, {type: "success"})
                                            setLoading(false)
                                            setEdit('')
                                        })
                                        .catch((err)=> {
                                            console.log(err)
                                            toast(err.response.data.message, {type: "error"})
                                            setLoading(false)
                                        })
                                }}
                            >
                                Submit
                            </button>
                            <button className={'btn bg-red-500 text-white rounded-md'} onClick={()=> {
                                setEdit("")
                                setSettings(prevState => {
                                    return{...prevState, email: ""}
                                })
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )
        default:
            return (
                <div className={'w-9/12'}>
                    <BackButton/>
                    <h3 className={"text-3xl text-center mb-5"}>
                        Settings
                    </h3>
                    <div className={"profile-btn messages"} onClick={()=> setEdit("username")}>
                        <Icon name={"account_circle"} className={"mr-2"}/>
                        <span className={"text-xl font-medium"}>
                            Edit Username
                        </span>
                    </div>
                    <div className={"profile-btn messages"} onClick={()=> setEdit("password")}>
                        <Icon name={"password"} className={"mr-2"}/>
                        <span className={"text-xl font-medium"}>
                            Edit Password
                        </span>
                    </div>
                    <div className={"profile-btn messages"} onClick={()=> setEdit("email")}>
                        <Icon name={"inbox_customize"} className={"mr-2"}/>
                        <span className={"text-xl font-medium"}>
                            Edit email
                        </span>
                    </div>
                </div>
            )

    }
}

export default Settings

export const getServerSideProps = async ({req}) => {
  const session = await getSession({req})

  if (session === null){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
