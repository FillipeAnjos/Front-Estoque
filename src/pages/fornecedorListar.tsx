import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/FornecedorListar/styles.module.scss';
import stylesPaginacao from '../components/Paginacao/styles.module.scss';
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FcSearch } from "react-icons/fc";
import { FaTrashAlt } from "react-icons/fa";
import { ModalEditarPageListFornecedor } from "../components/Modal/ModalEditarPageListFornecedor"
import ActionAlerts from "../components/Alert"; 

import ReactPaginate from "react-paginate";

interface IFornecedores{
    id: number[];
    nome: string[];
    email: string[];
    cnpj: string[];
    razao: string[];
    falarcom: string[];
    created_at: Date[];
    updated_at: Date[];
}

export default function FornecedorListar(){

    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');

    const [fornecedores, setFornecedores] = useState<IFornecedores[]>([]);
    
    // ---------------------- Alerta ----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    // ---------------------- Paginação ----------------------
        const [pageNumber, setPageNumber] = useState(0);

        const fornecedoresPorPage = 10;
        const pagesVisited = pageNumber * fornecedoresPorPage;

        const pageCount = Math.ceil(fornecedores.length / fornecedoresPorPage);

        const mudarPagina = ({ selected }) => {
            setPageNumber(selected);
        };
    // -------------------------------------------------------

    useEffect(() => {
        listarFornecedores();
    }, []);

    function listarFornecedores(){
        api({
            method: 'GET',
            url: '/listarFornecedores'
        }).then( (res) => {
            setFornecedores(res.data.fornecedores);
        })
    }

    function pesquisar() {

        var dadosParam = {
            filtro: filtro,
            dados: dados
        }
        
        api({
            method: 'POST',
            url: '/listarFornecedores',
            data: {
                param: dadosParam
            }
        }).then( (res) => {
            setFornecedores(res.data.fornecedores);
        })

    }

    function acao( id: number[] ){

        if(confirm("Deseja realmente excluir esse fornecedor?")){
            api({
                method: 'POST',
                url: '/excluirFornecedor',
                data: {
                    id: id
                }
            }).then( (res) => {
                listarFornecedores();
                    if(res.data.fornecedor.error){

                        setAlertatipo('error');
                        setAlertamsg(res.data.fornecedor.error);
                        estadoAlerta();
                        return false;

                    }
                    
                    setAlertatipo('success');
                    setAlertamsg(res.data.fornecedor.msg);
                    estadoAlerta();
                    
            })
        }
    
    }

    function estadoAlerta(){
        alerta == true ? setAlerta(false) : setAlerta(true);
    }

    const ReactPaginates = ReactPaginate as any; // Gambiarra feita para resolver o erro da Vercel, retorno de um elemento JSX

  return (
      <>
        <Head>
            <title>Listar Fornecedores</title>
        </Head>
        
        <div className={styles.container}>
            <h2>Fornecedor Listar</h2>

            <hr />

            {alerta == true 
            ? <ActionAlerts 
                estado={alerta} 
                alterarEstadoDoAlertaDoPai={estadoAlerta} 
                tipo={alertatipo}
                mensagem={alertamsg}
              />  
            : ''
        }

            <br/>
                <label>
                    Pesquisar<br/>
                    <select value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
                            <option value="0">Selecione</option>
                            <option value="1">Nome</option>
                            <option value="2">email</option>
                            <option value="3">Cnpj</option>
                        </select>
                    <div className={styles.pesquisar}>
                        <input type="text" value={dados} onChange={ (event) => setDados(event.target.value) }/>
                        <h1 title="Pesquisar fornecedor?" onClick={ () => pesquisar()}><FcSearch /></h1>
                    </div>
                </label>
            <br/>

            <table >
                <thead>
                <tr>
                    <th>Cód</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cnpj</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {fornecedores
                    .slice(pagesVisited, pagesVisited + fornecedoresPorPage)
                    .map((ele, index) => {
                        return (
                            <tr key={index}>
                                <td>{ele.id}</td>
                                <td>{ele.nome}</td>
                                <td>{ele.email}</td>
                                <td>{ele.cnpj}</td>
                                <td className={styles.acao}>
                                    <h4 title="Excluir cadastro de fornecedor?" onClick={ () => acao(ele.id) }>
                                        <FaTrashAlt />
                                    </h4 >
                                    <ModalEditarPageListFornecedor fornecedorSelecionado={ele}/>
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

//export default verificarAutenticidade(FornecedorListar);