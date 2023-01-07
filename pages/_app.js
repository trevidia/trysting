import '../styles/global.css'
import {Provider} from "react-redux";
import store from "../redux/app/store";

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <main className={"w-screen h-screen bg-zinc-900 p-3 flex items-center justify-center text-zinc-200"}>
      <div className={"relative sm:h-5/6 lg:w-2/5 sm:w-3/5 w-full h-full bg-zinc-800 rounded-md px-4 py-8 flex justify-center shadow-md shadow-zinc-800/50 overflow-clip"}>
        <Component {...pageProps} />
      </div>
    </main>
  </Provider>
}
