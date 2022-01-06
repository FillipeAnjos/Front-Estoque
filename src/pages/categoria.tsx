import Head from "next/head";
import styles from "../components/Categoria/styles.module.scss";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import ActionAlerts from "../components/Alert";

function Categoria(){

    const [descricao, setDescricao] = useState('');
    const [categorias, setCategorias] = useState([]);

    // ------------------------ Alerta -----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    useEffect( () => {
        buscarCategorias();
    }, []);

    return (
        <>
            <Head>
                <title>Categoria</title>
            </Head>
            <div className={styles.container}>
                <h2>Categoria</h2>
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

                <div className={styles.containerCategoriaDescricao}>
                        <label>
                            Descrição<br/>
                            <input type="text" className={styles.descricao} maxLength={100} value={descricao} onChange={ (event) => setDescricao(event.target.value) }/>
                        </label>

                </div>
                
                <div className={styles.containerButton}>
                    <button onClick={ () => cadastrarCategoria() }>Cadastrar Categoria</button>
                </div>

                <br/><br/>

                <h3>Abaixo a lista de categorias já cadastradas</h3>
                <br/>
                <ul>
                    {categorias.map((item, index) => (
                        <li value={item.descricao} key={index}>{item.descricao}</li>
                    ))}
                </ul>
 
            </div>
        </>
    )

    function cadastrarCategoria() {

        if(descricao == ''){
            alert("Favor informar a descrição da nova categoria.");
            return false;
        }

        if(!confirm("Deseja realmente cadastrar essa categoria?")){
            return false;
        }

        api({
            method: 'POST',
            url: '/cadastrarCategoria',
            data: {
                param: descricao
            }
        }).then( (res) => {

            if(res.data.categoria.error){
                chamarAlert('error', res.data.categoria.msg);
                return false;
            }

            chamarAlert('success', res.data.categoria.msg);
            setDescricao('');
        })

    }

    function buscarCategorias(){
        api({
            method: 'GET',
            url: '/buscarCategorias'
        }).then(res => {
            setCategorias(res.data.categorias);
        })
    }

    function estadoAlerta(){
        alerta == true ? setAlerta(false) : setAlerta(true);
    }

    function chamarAlert(tipo: string, mensagem: string){
        setAlertatipo(tipo);
        setAlertamsg(mensagem);
        estadoAlerta();
    }

}

export default verificarAutenticidade(Categoria);