import {store} from "../src/app/store";
import {Provider} from "react-redux";
import {Provider as AuthProvider} from "next-auth/client";
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return( 
    //  Auth provider allsows sign in /sign out functiomaity to be used inthrought the app to
    //  as its a higher order component
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp;
