import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/ProdutoQtd/styles.module.scss';
import stylesPaginacao from '../components/Paginacao/styles.module.scss';
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FcSearch } from "react-icons/fc";
import { FaTrashAlt } from "react-icons/fa";
import { ModalEditarQuantidadeProduto } from "../components/Modal/ModalEditarQuantidadeProduto"
import ActionAlerts from "../components/Alert"; 

import ReactPaginate from "react-paginate";


interface IProdutos{
    id: number[];
    produto: string[];
    categoria: string[];
    descricao: string[];
    cor: string[];
    tamanho: string[];
    valor: number[];
    obs: string[];
    status: boolean[];
    created_at: Date[];
    updated_at: Date[];
    quantidade?: number; 
}

function ProdutoQtd(){

    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');
    
    // ---------------------- Alerta ----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    // ---------------------- Paginação ----------------------
        const [pageNumber, setPageNumber] = useState(0);

        const produtosPorPage = 10;
        const pagesVisited = pageNumber * produtosPorPage;

        const pageCount = Math.ceil(produtos.length / produtosPorPage);

        const mudarPagina = ({ selected }) => {
            setPageNumber(selected);
        };
    // -------------------------------------------------------

    useEffect(() => {
        
        listarProdutos();

    }, []);

    function listarProdutos(){
        api({
            method: 'GET',
            url: '/listarProdutosBalanco'
        }).then( (res) => {
            setProdutos(res.data.produtos);
        })
    }

    function pesquisar() {

        var dadosParam = {
            filtro: filtro,
            dados: dados,
            acao: true
        }
        
        api({
            method: 'POST',
            url: '/listarProdutosBalanco',
            data: {
                param: dadosParam
            }
        }).then( (res) => {
            setProdutos(res.data.produtos);
        })

    }

    function estadoAlerta(){
        alerta == true ? setAlerta(false) : setAlerta(true);
    }

    const ReactPaginates = ReactPaginate as any; // Gambiarra feita para resolver o erro da Vercel, retorno de um elemento JSX

  return (
      <>
        <Head>
            <title>Balanço</title>
        </Head>

        {alerta == true 
            ? <ActionAlerts 
                estado={alerta} 
                alterarEstadoDoAlertaDoPai={estadoAlerta} 
                tipo={alertatipo}
                mensagem={alertamsg}
              />  
            : ''
        }
        
        <div className={styles.container}>
            <h2>Balanço</h2>

            <hr />

            <br/>
                <label>
                    Pesquisar<br/>
                    <select value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
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

            <table >
                <thead>
                <tr>
                    <th>Cód</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th>Tamanho</th>
                    <th>Valor</th>
                    <th>Uni</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {produtos
                    .slice(pagesVisited, pagesVisited + produtosPorPage)
                    .map((ele, index) => {
                        return (
                            <tr key={index}>
                                <td>{ele.id}</td>
                                <td>{ele.produto}</td>
                                <td>{ele.categoria}</td>
                                <td>{ele.descricao}</td>
                                <td>{ele.tamanho}</td>
                                <td>R$ {ele.valor}</td>
                                <td>{ele.quantidade}</td>
                                <td className={styles.acao}>
                                    <ModalEditarQuantidadeProduto produtoSelecionado={ele}/>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>

            <br/><br/>

            <ReactPaginates
                previousLabel={"<<<"}
                nextLabel={">>>"}
                pageCount={pageCount}
                onPageChange={mudarPagina}
                containerClassName={stylesPaginacao.paginationBttns}
                previousLinkClassName={stylesPaginacao.previousBttn}
                nextLinkClassName={stylesPaginacao.nextBttn}
                disabledClassName={stylesPaginacao.paginationDisabled}
                activeClassName={stylesPaginacao.paginationActive}
            />

        </div>
      </>
  );

}

export default verificarAutenticidade(ProdutoQtd);