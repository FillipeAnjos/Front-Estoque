import styles from '../components/Login/styles.module.scss';
import Head from 'next/head'
import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import Link from 'next/link';

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const {data: session} = useSession();

    console.log(session);

    async function enviarFormulario(event: FormEvent) {
        event.preventDefault();

        let obj = {email, senha};    

        const response = await api({
                                    method: 'post',
                                    url: '/login',
                                    data: {
                                    obj: obj
                                    }
                                }).then(function(res) {
                                    //console.log(res.data);
                                })


    }

    return (
        <>
            <Head>
                <title>Login | Estoque</title>
            </Head>

            <main>
                
                <div className={styles.caixaContainer}>

                    <img src="/imagens/login.png" alt="Login" />

                    <div className={styles.caixaLogin}>

                        <h2>Seja bem-vindo!</h2>

                        <form className={styles.caixaCampos}>
                            
                            <input 
                                type="text" 
                                placeholder="Email"
                                value={email}
                                onChange={ event => setEmail(event.target.value) }
                                className={styles.inputEmail}
                            />
                            <input 
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={ event => setSenha(event.target.value) }
                                className={styles.inputSenha}
                            />
                            <br/>
                            {!session ? 
                                <>
                                    <button 
                                        type="submit"
                                        className={styles.buttonLogar}
                                        onClick={() => signIn()}
                                    >
                                        Logar
                                    </button> 
                                    <br/>
                                    {/* <a href="/criarConta" className={styles.buttonCriar}>Criar Nova Conta</a> */ }
                                    <Link href="/criarConta" >Criar Nova Conta</Link>
                                </>
                            : 
                                <button 
                                    type="submit"
                                    className={styles.buttonLogar}
                                    onClick={() => signOut()}
                                >
                                    Deslogar
                                </button> 
                            }
                                                   
                            <br/><br/>
                        </form>
                    </div>
                </div>
                
            </main>
        </>
    )
}