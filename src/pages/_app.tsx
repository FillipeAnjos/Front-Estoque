import '../styles/global.scss'; 
import styles from '../styles/styles.module.scss';
import { Sidebar } from '../components/Sidebar';

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, session, pageProps }) {

  return (
    <SessionProvider session={session}>
      <div className={styles.divPai}>  
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )

}

export default MyApp
