import CriarConta from './criarConta';
//import HomePage from './home';
import { useSession } from "next-auth/react"

import dynamic from 'next/dynamic';

const HomePage = dynamic( () => import("./home"), { ssr: false });// Essa linha resolver o erro de "ReferenceError: window is not defined" - https://www.youtube.com/watch?v=KecDqkKt3HI

export const getStaticProps = async () => {

  return {
      props: {
          chave_OpenWeatherMap: process.env.NEXT_PUBLIC_CHAVE_API_OpenWeatherMap,
      }
  }
}

export default function Home({ chave_OpenWeatherMap }) {

  const {data: session} = useSession();

  //return session != null ? (
    return session == null ? (
    <>
      <HomePage chaveTemperatuda={chave_OpenWeatherMap} />
    </>
  ) : (
   <>
      <CriarConta />
   </>
  )
}
