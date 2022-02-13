import CriarConta from './criarConta';
//import HomePage from './home';
import { useSession } from "next-auth/react"
import { Autenticacao } from '../utils/autenticacao';

import dynamic from 'next/dynamic';
import { useContext } from 'react';
import { api } from '../services/api';
import { contextProdutos } from '../hooks/useContextProdutos';

const HomePage = dynamic( () => import("./home"), { ssr: false });// Essa linha resolver o erro de "ReferenceError: window is not defined" - https://www.youtube.com/watch?v=KecDqkKt3HI

export const getStaticProps = async () => {

  return {
      props: {
          chave_OpenWeatherMap: process.env.NEXT_PUBLIC_CHAVE_API_OpenWeatherMap,
          chave_adm: process.env.NEXT_PUBLIC_CHAVE_SENHA_ADM,
      }
  }
}

export default function Home({ chave_OpenWeatherMap, chave_adm }) {

  var autenticacao = new Autenticacao();
  var tokenLogado = autenticacao.userLogado();
  
  //const {data: session} = useSession();
  
  let { vendas } = useContext(contextProdutos);

  //return session != null ? (
  return tokenLogado != null ? (
    <>
      <HomePage chaveTemperatuda={chave_OpenWeatherMap} vendas={vendas}  />
    </>
  ) : (
   <>
      <CriarConta chave_adm={chave_adm} />
   </>
  )
}
