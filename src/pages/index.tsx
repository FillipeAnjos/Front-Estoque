import CriarConta from './criarConta';
//import HomePage from './home';
import { useSession } from "next-auth/react"

import dynamic from 'next/dynamic';

const HomePage = dynamic( () => import("./home"), { ssr: false });// Essa linha resolver o erro de "ReferenceError: window is not defined" - https://www.youtube.com/watch?v=KecDqkKt3HI

export default function Home() {

  const {data: session} = useSession();

  return session != null ? (
    <>
        <HomePage />
    </>
  ) : (
   <>
        <CriarConta />
   </>
  )
}
