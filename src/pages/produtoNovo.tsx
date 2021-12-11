import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade"

function ProdutoNovo(){
    return (
        <>
            <Head>
                <title>Novo Produto</title>
            </Head>
            <h1>Page ProdutoNovo</h1>
        </>
    )
}

export default verificarAutenticidade(ProdutoNovo);