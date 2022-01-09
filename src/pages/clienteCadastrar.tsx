import Head from "next/head";
import { useState } from "react";
import ActionAlerts from "../components/Alert";
import styles from "../components/ClienteCadastrar/styles.module.scss";
import { api } from "../services/api";
import verificarAutenticidade from "../utils/verificarAutenticidade";

function ClienteCadastrar(){

    const [nome, setNome]             = useState('');
    const [cpf, setCpf]               = useState('');
    const [nascimento, setNascimento] = useState('');
    const [genero, setGenero]         = useState('f');
    const [civil, setCivil]           = useState('');
    const [uf, setUf]                 = useState('');
    const [rg, setRg]                 = useState('');
    const [endereco, setEndereco]     = useState('');
    const [numero, setNumero]         = useState(0);
    const [tel, setTel]               = useState('');
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
                <title>Cliente Cadastro</title>
            </Head>
            <div className={styles.container}>
                <h2>Cliente Cadastrar</h2>
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
                            <span>Nome<div>*</div></span>
                            <input type="text" maxLength={100} value={nome} onChange={ (event) => setNome(event.target.value) }/>
                        </label>
                    
                        <label>
                            <span>CPF</span>
                            <input type="text" maxLength={20} value={cpf} onChange={ (event) => setCpf(event.target.value) }/>
                        </label>

                        <span>
                            <label>
                                Data Nascimento<br/>
                                <input type="date" maxLength={30} value={nascimento} onChange={ (event) => setNascimento(event.target.value) }/>
                            </label>
                        
                            <label>
                                Genero<br/>
                                <select value={genero} onChange={ event => setGenero(event.target.value) }>
                                    <option value="m">Masculino</option>
                                    <option value="f" selected>Feminino</option>
                                    <option value="o">Outro</option>
                                </select>
                            </label>
                        </span>
                    </div>

                    <div className={styles.civilUf}>

                        <div>
                            <label>
                                <span>UF</span>
                                <input type="text" maxLength={2} value={uf} onChange={ (event) => setUf(event.target.value) }/>
                            </label>

                            <label>
                                <span>Est. Civil</span>
                                <input type="text" maxLength={100} value={civil} onChange={ (event) => setCivil(event.target.value) }/>
                            </label>
                        </div>
                    
                        <label className={styles.rg}>
                            <span>RG</span>
                            <input type="text" maxLength={100} value={rg} onChange={ (event) => setRg(event.target.value) }/>
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

                        <label className={styles.tel}>
                            <span>Telefone</span>
                            <input type="text" maxLength={50} value={tel} onChange={ (event) => setTel(event.target.value) }/>
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
            chamarAlert("error", "O nome do cliente tem que ser preenchido.");
            return false;
        }
        if(endereco == ''){
            chamarAlert("error", "O endereco do cliente tem que ser preenchido.");
            return false;
        }
        if(cel == ''){
            chamarAlert("error", "O Celular do cliente tem que ser preenchido.");
            return false;
        }
        if(email == ''){
            chamarAlert("error", "O email do cliente tem que ser preenchido.");
            return false;
        }

        var dados = {
            nome: nome,
            cpf: cpf,
            nascimento: nascimento,
            genero: genero,
            civil: civil,
            uf: uf,
            rg: rg,
            endereco: endereco,
            numero: numero,
            tel: tel,
            cel: cel,
            email: email
        }

        api({
            method: 'POST',
            url: '/cadastrarCliente',
            data: {
                param: dados
            }
        }).then(res => {
            if(res.data.cliente.error){
                chamarAlert("error", res.data.cliente.msg);
                return false;
            }

            chamarAlert("success", res.data.cliente.msg);
            limpar();
        })

    }

    function limpar(){
        setNome('');
        setCpf('');
        setNascimento('');
        setGenero('f');
        setCivil('');
        setUf('');
        setRg('');
        setEndereco('');
        setNumero(0);
        setTel('');
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

export default verificarAutenticidade(ClienteCadastrar);