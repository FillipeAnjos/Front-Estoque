import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/ProdutoQtd/styles.module.scss';

function ProdutoQtd(){
    return (
        <>
            <Head>
                <title>Quantidade</title>
            </Head>
            <div className={styles.container}>
                <h2>Page Produto Quantidade</h2>
            </div>
        </>
    )
}

export default verificarAutenticidade(ProdutoQtd);