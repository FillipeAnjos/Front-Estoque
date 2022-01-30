import Head from "next/head";
import { useState } from "react";
import styles from "../components/RelatorioProdutos/styles.module.scss";
import { api } from "../services/api";
import { GerarRelatorioPDF } from "../utils/gerarRelatorioPDF";
import verificarAutenticidade from "../utils/verificarAutenticidade";

function RelatorioProdutos(){

    const [filtro, setFiltro] = useState('0');
    const [dados, setDados] = useState('');
    const [ordenacao, setOrdenacao] = useState('id');
    const [ordenacaoordem, setOrdenacaoordem] = useState('asc');

    return (
        <>
            <Head>
                <title>Relatório Produtos</title>
            </Head>
            <div className={styles.container}>
            <h2>Relatório Produtos</h2>
            <hr />

            <br/><br/>

            <label>
                Pesquisar<br/>
                <select value={filtro} onChange={ (event) => setFiltro(event.target.value) }>
                        <option value="0">Selecione</option>
                        <option value="1">Código</option>
                        <option value="2">Produto</option>
                        <option value="3">Categoria</option>
                        <option value="4">Descrição</option>
                        <option value="5">Cor</option>
                        <option value="6">Observação</option>
                        <option value="7">Valor</option>
                        <option value="8">Produtos - Ativo</option>
                        <option value="9">Produtos - Inativo</option>
                        <option value="10">Quantidade</option>
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
                    <option value="valor">Valor</option>
                    <option value="categoria">Categoria</option>
                    <option value="descricao">Descricao</option>
                    <option value="cor">Cor</option>
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
                            url: '/relatorioProdutos',
                            data: {
                                param: dadosParam
                            }
                        }).then(res => {
                            return res.data.produtos;
                        })

        const gerarRelatorio = new GerarRelatorioPDF();
        gerarRelatorio.gerarRelatorioProdutos(resultado);

    }

}

export default verificarAutenticidade(RelatorioProdutos);