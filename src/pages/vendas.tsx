import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/Vendas/styles.module.scss';
import stylesPaginacao from '../components/Paginacao/styles.module.scss';
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FcSearch } from "react-icons/fc";
import ActionAlerts from "../components/Alert"; 
import ReactPaginate from "react-paginate";
import moment from "moment";

interface IVendas{
    id: number[];
    id_fechamento: number[];
    id_user: number[];
    desconto: number[];
    modalidade: string[];
    valor_total: number[];
    data: Date[];
    obs: string[];
    created_at: Date[];
    updated_at: Date[];
}

function Vendas(){

    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');

    const [vendas, setVendas] = useState<IVendas[]>([]);
    
    // ---------------------- Alerta ----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    // ---------------------- Paginação ----------------------
        const [pageNumber, setPageNumber] = useState(0);

        const vendasPorPage = 10;
        const pagesVisited = pageNumber * vendasPorPage;

        const pageCount = Math.ceil(vendas.length / vendasPorPage);

        const mudarPagina = ({ selected }) => {
            setPageNumber(selected);
        };
    // -------------------------------------------------------

    useEffect(() => {
        
        listarVendas();

    }, []);

    function listarVendas(){
        api({
            method: 'GET',
            url: '/listarVendas'
        }).then( (res) => {
            setVendas(res.data.vendas);
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
            url: '/listarVendas',
            data: {
                param: dadosParam
            }
        }).then( (res) => {
            setVendas(res.data.vendas);
        })

    }

    function estadoAlerta(){
        alerta == true ? setAlerta(false) : setAlerta(true);
    }

  return (
      <>
        <Head>
            <title>Listar Vendas</title>
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
            <h2>Vendas </h2>

            <hr />

            <br/>
                <label>
                    Pesquisar<br/>
                    <select value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
                            <option value="0">Selecione</option>
                            <option value="1">Data</option>
                            <option value="2">Modalidade</option>
                            <option value="3">Valor</option>
                        </select>
                    <div className={styles.pesquisar}>
                        {
                            filtro != '1' 
                            ? <input type="text" value={dados} onChange={ (event) => setDados(event.target.value) }/>
                            : <input type="date" value={dados} onChange={ (event) => setDados(event.target.value) }/> 
                        }
                        <h1 title="Pesquisar vendas?" onClick={ () => pesquisar()}><FcSearch /></h1>
                    </div>
                </label>
            <br/>

            <table >
                <thead>
                <tr>
                    <th>Cód</th>
                    <th>Data</th>
                    <th>Modalidade</th>
                    <th>Desconto</th>
                    <th>Obs</th>
                    <th>Valor</th>
                </tr>
                </thead>
                <tbody>
                {vendas
                    .slice(pagesVisited, pagesVisited + vendasPorPage)
                    .map((ele, index) => {
                        return (
                            <tr key={index}>
                                <td>{ele.id}</td>
                                <td>{moment(ele.data.toString()).format("DD/MM/YYYY")}</td>
                                <td>{ele.modalidade}</td>
                                <td>{ele.desconto == null ? ' - ' : ele.desconto}</td>
                                <td>{ele.obs}</td>
                                <td>R$ {ele.valor_total}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>

            <br/><br/>

            <ReactPaginate
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

export default verificarAutenticidade(Vendas);