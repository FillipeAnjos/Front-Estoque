import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/ProdutoListar/styles.module.scss';
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FcSearch } from "react-icons/fc";

interface IProdutos{
    id: number[];
    produto: string[];
    categoria: string[];
    descricao: string[];
    cor: string[];
    tamanho: string[];
    obs: string[];
    status: boolean[];
    created_at: Date[];
    updated_at: Date[];
}

function ProdutoListar(){

    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [filtro, setFiltro] = useState('0');
    const[dados, setDados] = useState('');

    useEffect(() => {
        
        api({
            method: 'GET',
            url: '/listarProdutos'
        }).then( (res) => {
            setProdutos(res.data.produtos);
        })

    }, []);

    function pesquisar() {

        var dadosParam = {
            filtro: filtro,
            dados: dados
        }
        
        api({
            method: 'POST',
            url: '/listarProdutos',
            data: {
                param: dadosParam
            }
        }).then( (res) => {
            console.log(res);
        })

    }

    return (
        <>
            <Head>
                <title>Listar Produto</title>
            </Head>
            <div className={styles.container}>
                <h2>Produto Listar</h2>

                <br/>
                    <label>
                        Pesquisar<br/>
                        <select className={styles.categoria} value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
                                <option value="0">Selecione</option>
                                <option value="1">Produto</option>
                                <option value="2">Categoria</option>
                                <option value="3">Descrição</option>
                                <option value="4">Tamanho</option>
                            </select>
                        <div className={styles.pesquisar}>
                            <input type="text" value={dados} onChange={ (event) => setDados(event.target.value) }/>
                            <h1 title="Pesquisar produto?" onClick={ () => pesquisar()}><FcSearch /></h1>
                        </div>
                    </label>
                <br/>

                    <table>
                        <tr>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Descrição</th>
                        </tr>
                        {produtos.map((ele) => {
                            return (
                                <tr>
                                    <td>{ele.produto}</td>
                                    <td>{ele.categoria}</td>
                                    <td>{ele.descricao}</td>
                                </tr>
                            )
                        })}
                    </table>

            </div>
        </>
    )
}

export default verificarAutenticidade(ProdutoListar);