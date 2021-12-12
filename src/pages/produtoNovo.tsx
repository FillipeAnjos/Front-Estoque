import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade"
import styles from '../components/ProdutoNovo/styles.module.scss';

function ProdutoNovo(){
    return (
        <>
            <Head>
                <title>Novo Produto</title>
            </Head>
            <div className={styles.container}>
                <h2>Page Produto Novo</h2>
            </div>
        </>
    )
}

export default verificarAutenticidade(ProdutoNovo);