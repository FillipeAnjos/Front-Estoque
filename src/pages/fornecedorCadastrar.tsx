import Head from "next/head";
import { useState } from "react";
import ActionAlerts from "../components/Alert";
import styles from "../components/FornecedorCadastrar/styles.module.scss";
import { api } from "../services/api";
import verificarAutenticidade from "../utils/verificarAutenticidade";

export default function FornecedorCadastrar(){

    const [nome, setNome]             = useState('');
    const [cnpj, setCnpj]             = useState('');
    const [razao, setRazao]           = useState('');
    const [endereco, setEndereco]     = useState('');
    const [numero, setNumero]         = useState(0);
    const [falarcom, setFalarcom]     = useState('');
    const [cel, setCel]               = useState('');
    const [email, setEmail]           = useState('');

    // ------------------------ Alerta -----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    return (
        <>
            <Head>
                <title>Fornecedor Cadastro</title>
            </Head>
            <div className={styles.container}>
                <h2>Fornecedor Cadastrar</h2>
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

                <br/><br/>

                <div className={styles.bloco1}>
                    <img src="/imagens/user/user.jpg" alt="Logo let's read"/>

                    <div>
                        <label>
                            <span>Nome Fantasia<div>*</div></span>
                            <input type="text" maxLength={100} value={nome} onChange={ (event) => setNome(event.target.value) }/>
                        </label>

                        <label>
                            <span>Razão Social</span>
                            <input type="text" maxLength={100} value={razao} onChange={ (event) => setRazao(event.target.value) }/>
                        </label>
                    
                        <label>
                            <span>CNPJ</span>
                            <input type="text" maxLength={25} value={cnpj} onChange={ (event) => setCnpj(event.target.value) }/>
                        </label>

                    </div>

                </div>

                <div className={styles.bloco2}>

                    <div>

                        <label className={styles.endereco}>
                            <span>Endereço<span>*</span></span>
                            <input type="text" maxLength={150} value={endereco} onChange={ (event) => setEndereco(event.target.value) }/>
                        </label>

                        <label className={styles.numero}>
                            <span>Numero</span>
                            <input type="number" maxLength={10} value={numero} onChange={ (event) => setNumero(parseInt(event.target.value)) }/>
                        </label>

                    </div>
                    

                    <div>

                        <label className={styles.falarcom}>
                            <span>Falar com<span>*</span></span>
                            <input type="text" maxLength={50} value={falarcom} onChange={ (event) => setFalarcom(event.target.value) }/>
                        </label>

                        <label className={styles.cel}>
                            <span>Celular<span>*</span></span>
                            <input type="text" maxLength={50} value={cel} onChange={ (event) => setCel(event.target.value) }/>
                        </label>

                        <label className={styles.email}>
                            <span>Email<span>*</span></span>
                            <input type="text" maxLength={100} value={email} onChange={ (event) => setEmail(event.target.value) }/>
                        </label>

                    </div>

                </div>
                
                <div className={styles.containerButton}>
                    <button onClick={ () => cadastrar() }>Cadastrar</button>
                    <button onClick={ () => limpar() }>Limpar</button>
                </div>
 
            </div>
        </>
    )

    function cadastrar(){

        if(nome == ''){
            chamarAlert("error", "O campo Nome Fantasia do fornecedor deve ser preenchido.");
            return false;
        }
        if(endereco == ''){
            chamarAlert("error", "O campo Endereco do fornecedor deve ser preenchido.");
            return false;
        }
        if(falarcom == ''){
            chamarAlert("error", "O campo Falar com do fornecedor deve ser preenchido.");
            return false;
        }
        if(cel == ''){
            chamarAlert("error", "O campo Celular do fornecedor deve ser preenchido.");
            return false;
        }
        if(email == ''){
            chamarAlert("error", "O campo Email do fornecedor deve ser preenchido.");
            return false;
        }


        var dados = {
            nome: nome,
            cnpj: cnpj,
            razao: razao,
            endereco: endereco,
            numero: numero,
            falarcom: falarcom,
            cel: cel,
            email: email,
        }

        api({
            method: 'POST',
            url: '/cadastrarFornecedor',
            data: {
                param: dados
            }
        }).then(res => {
            if(res.data.fornecedor.error){
                chamarAlert("error", res.data.fornecedor.msg);
                return false;
            }

            chamarAlert("success", res.data.fornecedor.msg);
            limpar();
        })

    }

    function limpar(){
        setNome('');
        setCnpj('');
        setRazao('');
        setEndereco('');
        setNumero(0);
        setFalarcom('');
        setCel('');
        setEmail('');
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

//export default verificarAutenticidade(FornecedorCadastrar);