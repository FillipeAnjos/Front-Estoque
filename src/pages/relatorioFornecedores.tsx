import Head from "next/head";
import { useState } from "react";
import styles from "../components/RelatorioFornecedores/styles.module.scss";
import { api } from "../services/api";
import { GerarRelatorioPDF } from "../utils/gerarRelatorioPDF";
import verificarAutenticidade from "../utils/verificarAutenticidade";

function RelatorioFornecedores(){

    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');
    const [ordenacao, setOrdenacao] = useState('id');
    const [ordenacaoordem, setOrdenacaoordem] = useState('asc');

    return (
        <>
            <Head>
                <title>Relatório Fornecedores</title>
            </Head>
            <div className={styles.container}>
            <h2>Relatório Fornecedores</h2>
            <hr />

            <br/><br/>

            <label>
                Pesquisar<br/>
                <select value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
                        <option value="0">Selecione</option>
                        <option value="1">Código</option>
                        <option value="2">Nome</option>
                        <option value="3">Email</option>
                        <option value="4">CNPJ</option>
                        <option value="5">Razão Social</option>
                    </select>
                <div className={styles.texto}>
                    <input type="text" value={dados} onChange={ (event) => setDados(event.target.value) } placeholder="" />   
                </div>
                
                <br/>

            </label>

            <label>
                Ordernar por<br/>
                <select value={ordenacao} onChange={ (event) => setOrdenacao(event.target.value) }>
                    <option value="id">Código</option>
                    <option value="nome">Nome</option>
                    <option value="email">Email</option>
                    <option value="cnpj">CNPJ</option>
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
            ordenacao: ordenacao,
            ordenacaoordem: ordenacaoordem,
        }
        
        var resultado = await api({
                            method: 'POST',
                            url: '/relatorioFornecedores',
                            data: {
                                param: dadosParam
                            }
                        }).then(res => {
                            return res.data.fornecedores;
                        })

        const gerarRelatorio = new GerarRelatorioPDF();
        gerarRelatorio.gerarRelatorioFornecedores(resultado);

    }

}

export default verificarAutenticidade(RelatorioFornecedores);