import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade"

function ProdutoExistente(){
    return (
        <>
            <Head>
                <title>Produto Existente</title>
            </Head>
            <h1>Page ProdutoExistente</h1>
        </>
    )
}

export default verificarAutenticidade(ProdutoExistente);