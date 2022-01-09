import Head from "next/head";
import { useState } from "react";
import styles from "../components/FornecedorCadastrar/styles.module.scss";
import { api } from "../services/api";
import verificarAutenticidade from "../utils/verificarAutenticidade";

function FornecedorCadastrar(){

    

    return (
        <>
            <Head>
                <title>Fornecedor Cadastro</title>
            </Head>
            <div className={styles.container}>
                <h2>Fornecedor Cadastrar</h2>
                <hr />
 
            </div>
        </>
    )

    
}

export default verificarAutenticidade(FornecedorCadastrar);