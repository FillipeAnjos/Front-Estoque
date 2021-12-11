import { useRouter } from 'next/router';
import CriarConta from './criarConta';
import Login from './login';
import styles from '../components/HomePage/styles.module.scss';

import { useSession, signIn, signOut } from "next-auth/react"
import { Sidebar } from '../components/Sidebar';
import ProdutoNovo from './produtoNovo';
import Head from 'next/head';

export default function Home() {

  const router = useRouter();

  const {data: session} = useSession();

  return session != null ? (

      <div>
        <Head>
            <title>Home Page</title>
        </Head>
        <h1>Home page</h1>
        <br/>
        <br/>
                    <button 
                          type="submit"
                          className={styles.buttonLogar}
                          onClick={() => signOut()}
                      >
                          Deslogar
                      </button> 
      </div>

  ) : (
   <>
    <CriarConta />
   </>
  )
}
