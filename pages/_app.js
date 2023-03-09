import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import store from "../redux/app/store";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    const adsbygoogle = window.adsbygoogle || [];
    adsbygoogle.push({})
  },[])
  return <SessionProvider session={pageProps.session}>
    {/* for the redux tool kit*/}
    <Provider store={store}>
      {/*to customize the looks of the app*/}
      <main className={"w-screen h-screen bg-zinc-900 p-3 flex items-center justify-center text-zinc-200"}>
        <div className={"relative sm:h-5/6 lg:w-2/5 sm:w-3/5 w-full h-full bg-zinc-800 rounded-md px-4 py-8 flex justify-center shadow-md shadow-zinc-800/50 overflow-clip"}>
          <Component {...pageProps} />
          <ToastContainer theme={"dark"}/>
        </div>
      </main>
    </Provider>
  </SessionProvider>
}
