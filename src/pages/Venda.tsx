import Head from "next/head";
import styles from "../components/Venda/styles.module.scss";
import { AiFillCaretDown } from 'react-icons/ai';

import verificarAutenticidade from "../utils/verificarAutenticidade";

function Venda(){

    return (
        <>
            <Head>
                <title>Venda</title>
            </Head>
            <div className={styles.container}>
                <h2>Venda</h2>
                <hr />

                <br/><br/>

                
            </div>
        </>
    )
}

export default verificarAutenticidade(Venda);