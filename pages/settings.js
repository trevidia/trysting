import {getSession} from "next-auth/react";
import Icon from "../components/Icon";

const Settings = () => {
  return (
      <div className={'w-9/12'}>
        <h3 className={"text-3xl text-center mb-5"}>
          Settings
        </h3>
        <div className={"profile-btn messages"}>
          <Icon name={"account_circle"} className={"mr-2"}/>
          <span className={"text-xl font-medium"}>
            Edit Username
          </span>
        </div>
        <div className={"profile-btn messages"}>
          <Icon name={"password"} className={"mr-2"}/>
          <span className={"text-xl font-medium"}>
            Edit Password
          </span>
        </div>
        <div className={"profile-btn messages"}>
          <Icon name={"inbox_customize"} className={"mr-2"}/>
          <span className={"text-xl font-medium"}>
            Edit email
          </span>
        </div>
      </div>
  )
}

export default Settings

export const getServerSideProps = async ({req}) => {
  const session = await getSession({req})

  console.log(session)
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
