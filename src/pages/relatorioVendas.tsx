import Head from "next/head";
import { useState } from "react";
import styles from "../components/RelatorioVendas/styles.module.scss";
import { api } from "../services/api";
import { GerarRelatorioPDF } from "../utils/gerarRelatorioPDF";
import verificarAutenticidade from "../utils/verificarAutenticidade";

function RelatorioVendas(){

    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');
    const [dadosdataini, setDadosdataini] = useState('');
    const [dadosdatafim, setDadosdatafim] = useState('');
    const [ordenacao, setOrdenacao] = useState('id');
    const [ordenacaoordem, setOrdenacaoordem] = useState('asc');
   

    // ------------------------ Alerta -----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    return (
        <>
            <Head>
                <title>Relatório Vendas</title>
            </Head>
            <div className={styles.container}>
            <h2>Relatório Vendas</h2>
            <hr />

            <br/><br/>

            <label>
                Pesquisar<br/>
                <select value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
                        <option value="0">Selecione</option>
                        <option value="1">Código</option>
                        <option value="2">Modalidade</option>
                        <option value="3">Data</option>
                        <option value="4">Valor</option>
                        <option value="5">Desconto</option>
                    </select>
                <div className={styles.texto}>
                    {
                        filtro != '3' 
                            ? <input type="text" value={dados} onChange={ (event) => setDados(event.target.value) } placeholder="" /> 
                            : <>
                                <input type="date" value={dadosdataini} onChange={ (event) => setDadosdataini(event.target.value) } placeholder="Data: inicio" />
                                <input type="date" value={dadosdatafim} onChange={ (event) => setDadosdatafim(event.target.value) } placeholder="Data fim" />
                            </>
                    }
                </div>
                
                <br/>

            </label>

            <label>
                Ordernar por<br/>
                <select value={ordenacao} onChange={ (event) => setOrdenacao(event.target.value) }>
                    <option value="id">Código</option>
                    <option value="modalidade">Modalidade</option>
                    <option value="valor_total">Valor</option>
                    <option value="desconto">Desconto</option>
                </select>
            </label>

            <label>
                <br/>
                <select value={ordenacaoordem} onChange={ (event) => setOrdenacaoordem(event.target.value) }>
                    <option value="asc">Crescente</option>
                    <option value="desc">Decrescente</option>
                </select>
            </label>

                <button onClick={ () => relatorio() }>Gerar Relatório</button>
            </div> 
 
        </>
    )

    async function relatorio(){

        var dadosParam = {
            filtro: filtro,
            dados: dados,
            dadosdataini: dadosdataini,
            dadosdatafim: dadosdatafim,
            ordenacao: ordenacao,
            ordenacaoordem: ordenacaoordem,
        }
        
        var resultado = await api({
                            method: 'POST',
                            url: '/relatorioVendas',
                            data: {
                                param: dadosParam
                            }
                        }).then(res => {
                            return res.data.vendas;
                        })

        const gerarRelatorio = new GerarRelatorioPDF();
        gerarRelatorio.gerarRelatorioVendas(resultado);

    }

}

export default verificarAutenticidade(RelatorioVendas);