import verificarAutenticidade from "../utils/verificarAutenticidade"
import styles from '../components/Produto/styles.module.scss';
import ProdutoListar from "./produtoListar";
import ProdutoNovo from "./produtoNovo";
import { useState } from "react";


function Produto(){

    const [tela, setTela] = useState(0);

    return (
        <>
            <div className={styles.container}>

                <div className={styles.buttons}>
                    <button onClick={ () => setTela(0) }>Produto Listar</button>
                    <button onClick={ () => setTela(1) }>Produto Novo</button>
                </div>

                {
                    tela == 0 ? <ProdutoListar /> : <ProdutoNovo />
                }
            </div>
        </>
    )
}

export default verificarAutenticidade(Produto);