import { Html, Head, Main, NextScript } from 'next/document'
import {useEffect} from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <script async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7923069855873137"
                  crossOrigin="anonymous"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7923069855873137"
                crossOrigin="anonymous"></script>
      </body>
    </Html>
  )
}
