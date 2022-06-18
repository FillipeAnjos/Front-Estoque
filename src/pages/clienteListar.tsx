import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/ClienteListar/styles.module.scss';
import stylesPaginacao from '../components/Paginacao/styles.module.scss';
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FcSearch } from "react-icons/fc";
import { FaTrashAlt } from "react-icons/fa";
import { ModalEditarPageListCliente } from "../components/Modal/ModalEditarPageListCliente"
import ActionAlerts from "../components/Alert"; 

import ReactPaginate from "react-paginate";

interface IClientes{
    id: number[];
    nome: string[];
    email: string[];
    cpf: string[];
    nascimento: Date[];
    civil: string[];
    genero: string[];
    rg: string[];
    created_at: Date[];
    updated_at: Date[];
}

function ClienteListar(){

    const [clientes, setClientes] = useState<IClientes[]>([]);
    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');
    
    // ---------------------- Alerta ----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    // ---------------------- Paginação ----------------------
        const [pageNumber, setPageNumber] = useState(0);

        const clientesPorPage = 10;
        const pagesVisited = pageNumber * clientesPorPage;

        const pageCount = Math.ceil(clientes.length / clientesPorPage);

        const mudarPagina = ({ selected }) => {
            setPageNumber(selected);
        };
    // -------------------------------------------------------

    useEffect(() => {
        listarClientes();
    }, []);

    function listarClientes(){
        api({
            method: 'GET',
            url: '/listarClientes'
        }).then( (res) => {
            setClientes(res.data.clientes);
        })
    }

    function pesquisar() {

        var dadosParam = {
            filtro: filtro,
            dados: dados
        }
        
        api({
            method: 'POST',
            url: '/listarClientes',
            data: {
                param: dadosParam
            }
        }).then( (res) => {
            setClientes(res.data.clientes);
        })

    }

    function acao( id: number[] ){

        if(confirm("Deseja realmente excluir esse cliente?")){
            api({
                method: 'POST',
                url: '/excluirCliente',
                data: {
                    id: id
                }
            }).then( (res) => {
                listarClientes();
                    if(res.data.cliente.error){

                        setAlertatipo('error');
                        setAlertamsg(res.data.cliente.error);
                        estadoAlerta();
                        return false;

                    }
                    
                    setAlertatipo('success');
                    setAlertamsg(res.data.cliente.msg);
                    estadoAlerta();
                    
            })
        }
    
    }

    function estadoAlerta(){
        alerta == true ? setAlerta(false) : setAlerta(true);
    }

    const ReactPaginates = ReactPaginate as any; // Ganbiarra feita para resolver o erro da Vercel, retorno de um elemento JSX

  return (
      <>
        <Head>
            <title>Listar Clientes</title>
        </Head>
        
        <div className={styles.container}>
            <h2>Cliente Listar</h2>

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
                            <option value="3">Cpf</option>
                        </select>
                    <div className={styles.pesquisar}>
                        <input type="text" value={dados} onChange={ (event) => setDados(event.target.value) }/>
                        <h1 title="Pesquisar cliente?" onClick={ () => pesquisar()}><FcSearch /></h1>
                    </div>
                </label>
            <br/>

            <table >
                <thead>
                <tr>
                    <th>Cód</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cpf</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {clientes
                    .slice(pagesVisited, pagesVisited + clientesPorPage)
                    .map((ele, index) => {
                        return (
                            <tr key={index}>
                                <td>{ele.id}</td>
                                <td>{ele.nome}</td>
                                <td>{ele.email}</td>
                                <td>{ele.cpf}</td>
                                <td className={styles.acao}>
                                    <h4 title="Excluir cadastro de cliente?" onClick={ () => acao(ele.id) }>
                                        <FaTrashAlt />
                                    </h4 >
                                    <ModalEditarPageListCliente clienteSelecionado={ele}/>
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

export default verificarAutenticidade(ClienteListar);