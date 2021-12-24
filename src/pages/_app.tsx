import '../styles/global.scss'; 
import styles from '../styles/styles.module.scss';
import { Sidebar } from '../components/Sidebar';

import { SessionProvider } from "next-auth/react";
import { UseContextProdutos } from '../hooks/useContextProdutos';

function MyApp({ Component, session, pageProps }) {

  return (
    <SessionProvider session={session}>
      <UseContextProdutos>
        <div className={styles.divPai}>  
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </UseContextProdutos>
    </SessionProvider>
  )

}

export default MyApp
