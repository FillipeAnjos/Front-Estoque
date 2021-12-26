import verificarAutenticidade from "../utils/verificarAutenticidade"
import styles from '../components/Produto/styles.module.scss';
import ProdutoListar from "./produtoListar";
import ProdutoNovo from "./produtoNovo";
import { useState } from "react";
import ProdutoListarInativos from "./produtoListarInativos";


function Produto(){

    const [tela, setTela] = useState(0);
    const [listartela, setListartela] = useState(true);

    function listar(statusTela: boolean){
        setTela(0);
        setListartela(statusTela);
    }

    return (
        <>
            <div className={styles.container}>

                <div className={styles.buttons}>
                    <button onClick={ () => listar(true) }>Listar Ativos</button>
                    <button onClick={ () => setTela(1) }>Produto Novo</button>
                    <button onClick={ () => listar(false) }>Listar Inativos</button>
                </div>

                {
                    tela == 0 
                    ? 
                        listartela == true ? <ProdutoListar /> : <ProdutoListarInativos /> 
                    : <ProdutoNovo />
                }
            </div>
        </>
    )
}

export default verificarAutenticidade(Produto);