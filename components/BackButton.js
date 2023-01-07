import {useRouter} from "next/router";

const BackButton = () => {
    const router = useRouter()
  return (
      <div
          onClick={()=>router.back()}
          className={"h-10 w-10 bg-zinc-400 rounded-md flex justify-center items-center " +
              "hover:bg-zinc-500 transition-colors absolute top-0 left-0 m-4 cursor-pointer"}>
          <span className="material-symbols-rounded material">
              arrow_back_ios_new
          </span>
      </div>
  )
}

export default BackButton