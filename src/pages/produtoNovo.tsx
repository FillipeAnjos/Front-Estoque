import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade"
import styles from '../components/ProdutoNovo/styles.module.scss';
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";

function ProdutoNovo(){

    const [codigo, setCodigo] = useState(0);
    const [produto, setProduto] = useState('');
    const [categoria, setCategoria] = useState('0');
    const [descricao, setDescricao] = useState('');
    const [cor, setCor] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [obs, setObs] = useState('');
    const [status, setStatus] = useState(true);

    function cadastrar(event: FormEvent) {
        event.preventDefault();

        var dados = {
            codigo: codigo,
            produto: produto,
            categoria: categoria,
            descricao: descricao,
            cor: cor,
            tamanho: tamanho,
            obs: obs,
            status: status
        }
        
        api({
            method: 'POST',
            url: '/cadastrarProduto',
            data: {
                param: dados
            }
        }).then( (res) => {

            alert(res.data.produto.success);

            var cod = codigo + 1;
            setCodigo(cod);
            setProduto('');
            setCategoria('');
            setDescricao('');
            setCor('');
            setTamanho('');
            setObs('');
        })

    }

    useEffect( () => {

        api({
            method: 'POST',
            url: '/buscarCodProd'
        }).then( (res) => {
            setCodigo(res.data.resposta.qtd);
        })

    }, [])

    return (
        <>
            <Head>
                <title>Novo Produto</title>
            </Head>
            <form onSubmit={cadastrar}>
                <div className={styles.container}>
                    <h2>Produto Novo</h2>
                    
                    <hr />
                    <br/>

                    <div className={styles.containerCodigoNome}>
                        <label>
                            Código do produto<br/>
                            <input type="text" disabled maxLength={10} value={codigo} />
                        </label>
                        <label>
                            Nome do produto<br/>
                            <input type="text" className={styles.produto} maxLength={250} value={produto} onChange={ (event) => setProduto(event.target.value) } />
                        </label>
                    </div>

                    <div className={styles.containerCategoriaDescricao}>
                        <label>
                            Categoria
                            <select className={styles.categoria} value={categoria} onChange={ (event) => setCategoria(event.target.value) }>
                                <option value="0">Selecione</option>
                                <option value="1">Blusa</option>
                                <option value="2">Calça</option>
                                <option value="3">Peça única</option>
                                <option value="4">Conjunto</option>
                                <option value="5">Assessórios</option>
                                <option value="6">Calçados</option>
                            </select>
                        </label>
                        <label>
                            Descrição<br/>
                            <input type="text" className={styles.descricao} maxLength={250} value={descricao} onChange={ (event) => setDescricao(event.target.value) }/>
                        </label>
                    </div>

                    <div className={styles.containerCorTamanho}>
                        <label>
                            Cor<br/>
                            <input type="text" maxLength={30} value={cor} onChange={ (event) => setCor(event.target.value)} />
                        </label>
                        <label>
                            Tamanho<br/>
                            <input type="text" className={styles.tamanho} maxLength={10} value={tamanho} onChange={ (event) => setTamanho(event.target.value)} />
                        </label>
                    </div>

                    <div className={styles.containerTextarea}>
                        <label>
                            Observação<br/>
                            <textarea cols={5} rows={5} maxLength={500} value={obs} onChange={ (event) => setObs(event.target.value)} />
                        </label>
                    </div>

                    <div className={styles.containerButton}>
                        <button>Cadastrar Produto</button>
                    </div>
                    

                    


                    {/* 
                        categoria
                            > Blusa
                            calsa
                            Peça única
                            Conjunto
                            Assessórios
                            Calçados

                        Blusa
                            > Descrição
                                > Cor
                                    > Tamanho
                                        > Obs
                                    
                        Status
                            > Ativo ou Inativo
                    
                    */}

                </div>
            </form>
        </>
    )
}

export default verificarAutenticidade(ProdutoNovo);