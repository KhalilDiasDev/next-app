import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Powered by Qriar labs" />
        <link rel="icon" href="https://images.qriarlabs.com/qiam/qiam-white-icon.ico" type="image/png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
