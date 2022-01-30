import Head from "next/head";
import { useState } from "react";
import styles from "../components/RelatorioClientes/styles.module.scss";
import { api } from "../services/api";
import { GerarRelatorioPDF } from "../utils/gerarRelatorioPDF";
import verificarAutenticidade from "../utils/verificarAutenticidade";

function RelatorioClientes(){

    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');
    const [ordenacao, setOrdenacao] = useState('id');
    const [ordenacaoordem, setOrdenacaoordem] = useState('asc');

    return (
        <>
            <Head>
                <title>Relatório Clientes</title>
            </Head>
            <div className={styles.container}>
            <h2>Relatório Clientes</h2>
            <hr />

            <br/><br/>

            <label>
                Pesquisar<br/>
                <select value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
                        <option value="0">Selecione</option>
                        <option value="1">Código</option>
                        <option value="2">Nome</option>
                        <option value="3">Email</option>
                        <option value="4">CPF</option>
                        <option value="5">Genero</option>
                        <option value="6">Estado Civil</option>
                        <option value="7">RG</option>
                    </select>
                <div className={styles.texto}>
                    {
                        filtro != '5' 
                        ? <input type="text" value={dados} onChange={ (event) => setDados(event.target.value) } placeholder="" />   
                        : <select value={dados} onChange={ (event) => setDados(event.target.value) }>
                            <option value="f">Feminino</option>
                            <option value="m">Masculino</option>
                          </select>
                    }
                </div>
                
                <br/>

            </label>

            <label>
                Ordernar por<br/>
                <select value={ordenacao} onChange={ (event) => setOrdenacao(event.target.value) }>
                    <option value="id">Código</option>
                    <option value="nome">Nome</option>
                    <option value="email">Email</option>
                    <option value="genero">Genero</option>
                    <option value="civil">Estado Civil</option>
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
                            url: '/relatorioClientes',
                            data: {
                                param: dadosParam
                            }
                        }).then(res => {
                            return res.data.clientes;
                        })

        const gerarRelatorio = new GerarRelatorioPDF();
        gerarRelatorio.gerarRelatorioClientes(resultado);

    }

}

export default verificarAutenticidade(RelatorioClientes);