import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

import "nprogress/nprogress.css";
import "../static/css/styles.css";
import "../node_modules/react-quill/dist/quill.snow.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
