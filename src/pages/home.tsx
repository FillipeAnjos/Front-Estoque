import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/HomePage/styles.module.scss';
import imgHome from '../../public/imagens/home/home1.png';
import Image from "next/image";
import moment from "moment";
import { WiCloud } from 'react-icons/wi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BiBarChart } from 'react-icons/bi';
import { RiBarcodeFill, RiTruckFill } from 'react-icons/ri';
import { IoPeopleSharp } from 'react-icons/io5';
import { FaTruck, FaUserCircle } from 'react-icons/fa';
import { IoIosSettings, IoLogoFacebook, IoIosNotifications, IoLogoWhatsapp, IoMdHelpCircleOutline, IoMdPerson, IoIosPaper, IoLogoInstagram } from 'react-icons/io';
import { useSession } from "next-auth/react";
import ProgressoMensal from '../components/ProgressoMensal';
import Temperatura from "../components/Temperatura";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import ActionAlerts from "../components/Alert";
import { useRouter } from "next/router";
import { Autenticacao } from "../utils/autenticacao";

function Home(props: any){

    //const {data: session} = useSession();

    const router = useRouter();

    // ------------------------ Alerta -----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    const [nomeuser, setNomeuser] = useState('');

    const [caixa, setCaixa] = useState(0);
    const [fechamentoAnterior, setFechamentoAnterior] = useState({});
    const [valorfechamentodia, setValorfechamentodia] = useState(0);

    const [usuarios, setUsuarios] = useState([]);

    useEffect( () => {
        
        buscarStatusCaixa();
        buscarVendasDia();
        buscarUsers();
        buscarNomeUser();

    }, [])

    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>
            <div className={styles.container}>

                <h2>Page Home</h2>
                
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

                <div className={styles.caixa1}>
                    <div className={styles.textoCaixa1Topo}>
                        <h2>Olá. {nomeuser}! </h2>
                        <p>
                            Você sabia que pode gerenciar sua empresa com um sistema?<br/>
                            A tecnologia veio para agilizar o nosso trabalho.
                        </p>
                        <div className={styles.temperatura}>
                            <Temperatura chaveTemperatuda={props.chaveTemperatuda} />
                        </div>
                        <div className={styles.nuvem}>
                            <h3><WiCloud /></h3>
                            <h4> Tempo</h4>
                        </div>
                    </div>
                    <Image src={imgHome} width={500} height={300} />
                </div>

                <div className={styles.caixa2}>
                    
                    <div className={styles.cubo} onClick={ () => cubo(1) }>
                        <div className={styles.cubo1}>
                            <h2><FaTruck /></h2>
                            <h4>Fornecedores</h4>
                        </div>
                    </div>

                    <div className={styles.cubo} onClick={ () => cubo(2) }>
                        <div className={styles.cubo2}>
                            <h2><IoPeopleSharp /></h2>
                            <p>Clientes</p>
                        </div>
                    </div>

                    <div className={styles.cubo} onClick={ () => cubo(3) }>
                        <div className={styles.cubo3}>
                            <h2><RiBarcodeFill /></h2>
                            <h4>Produtos</h4>
                        </div>
                    </div>

                    <div className={styles.cubo} onClick={ () => cubo(4) }>
                        <div className={styles.cubo4}>
                            <h2><AiFillDollarCircle /></h2>
                            <h4>Vendas</h4>
                        </div>
                    </div>

                </div>

                <div className={styles.caixa3}>
                    <div className={styles.textProgresso}>
                        <h2><BiBarChart /></h2><p>Progresso Mensal</p>
                    </div>
                    <ProgressoMensal tipo={"bar"} vendas={props.vendas} />
                </div>
                
            </div>

            <div className={styles.container2}>

                <div className={styles.redesSociais}>
                    {/*<a href="" target="_blank"><h2 title="Suas anotações"><IoIosPaper /></h2></a>*/}
                    <a href="" target="_blank"><h2 title="Configurações"><IoIosSettings /></h2></a>
                    {/*<a href="" target="_blank"><h2 title="9dades"><IoIosNotifications /></h2></a>*/}
                    <a href="" target="_blank"><h2 title="Usuários do sistema"><IoMdPerson /></h2></a>
                    <a href="https://www.instagram.com/" target="_blank"><h2 title="Instagram"><IoLogoInstagram /></h2></a>
                    <a href="https://www.facebook.com/" target="_blank"><h2 title="Facebook"><IoLogoFacebook /></h2></a>
                    <a href="https://web.whatsapp.com" target="_blank"><h2 title="Whatsapp"><IoLogoWhatsapp /></h2></a>
                    <a href="/ajuda" target="_blank"><h2 title="Ajuda"><IoMdHelpCircleOutline /></h2></a>
                </div>
                
                <div className={styles.caixa4}>
                    { fechamento(caixa) }                    
                </div>

                <h4 className={styles.textoMembros}>Membros</h4>
                <div className={styles.caixa5}>
                    
                    <div className={styles.usersSistem}>
                        {usuarios.map((item, index) => (
                            <div key={index}>
                                <h3><FaUserCircle /></h3>
                                <p>{item.nome}</p>
                                <h5>{item.sobre}</h5>
                            </div>
                        ))}

                    </div>

                </div>

                <h4 className={styles.textoConsumo}>Consumo</h4>
                <div className={styles.caixa6}>
                    <div className={styles.textConsumo}>
                        <h2><BiBarChart /></h2><p>Consumo</p>
                    </div>
                    <ProgressoMensal tipo={"area"}  />
                </div>

            </div>
            
        </>
    )

    function buscarStatusCaixa(){
        api({
            method: 'GET',
            url: '/buscarStatusCaixa'
        }).then((res) => {
            var cs = res.data.fechamento.caixa;

            if(cs == 1 || cs == 2 || cs == 3){
                setCaixa(res.data.fechamento.caixa)
            }else{
                setCaixa(4)
                setFechamentoAnterior(res.data);
            }
        })
    }

    async function salvarFechamento(param: boolean){

        buscarVendasDia();

        let dados = null;

        if(param == true){

            if(!confirm("Deseja abrir o caixa e iniciar seu trabalho?")){
                return false;
            }

            dados = {
                valor_total: 0,
                data: moment(new Date()).format("YYYY-MM-DD"),
                status: true
            };
        }else{

            if(!confirm("Certeza que deseja fechar o caixa agora?")){
                return false;
            }

            dados = {
                valor_total: valorfechamentodia != undefined ? valorfechamentodia : 0, 
                data: moment(new Date()).format("YYYY-MM-DD"),
                status: false
            };
        }

        api({
            method: 'POST',
            url: '/salvarFechamento',
            data: {
                param: dados
            }
        }).then((res) => {
            setCaixa(res.data.fechamento.caixa);
            chamarAlert('success', res.data.fechamento.msg);
        })

    }

    function salvarFechamentoAnterior(anterior: any){

        buscarVendasDia();

        const { data } = anterior.fechamento;

        var dados = {
            valor_total: valorfechamentodia != undefined ? valorfechamentodia : 0, 
            data: data,
            status: false
        };

        api({
            method: 'POST',
            url: '/salvarFechamentoAnterior',
            data: {
                param: dados
            }
        }).then((res) => {
            setCaixa(res.data.fechamento.caixa);

            var tipoAlert = '';
            var menssagemAlert = '';

            if(res.data.fechamento.error){
                
                tipoAlert = 'error';
                menssagemAlert = 'Ocorreu um erro ao tentar concluir o caixa do dia anterior. Contate o administrador do sistema.';
                chamarAlert(tipoAlert, menssagemAlert);

                return false;
            }

            tipoAlert = 'success';
            menssagemAlert = 'Fechamento do dia anterior concluído com sucesso.';
            chamarAlert(tipoAlert, menssagemAlert);
            
        })

    }

    function buscarVendasDia(){

        api({
            method: 'GET',
            url: '/buscarVendasDia'
        }).then( res => {
            if(res.data.fechamento.error){
                alert(res.data.fechamento.msg);
            }

            setValorfechamentodia(res.data.fechamento.valor_total);
        })
    }

    function fechamento(condition: number){

        switch (condition) {
            case 1:
                return (
                    <>
                        <div className={styles.fechamentoStatus}>
                            <div className={styles.bloco1}>
                                Abaixo você verá o botão para abrir o caixa e iniciar a sua jornada de trabalho.<br/><br/>
                                Tenha um ótimo trabalho.<br/>
                            </div>
        
                            <div className={styles.bloco2Inicio} onClick={() => salvarFechamento(true)}>
                                <p>Abrir caixa</p>
                            </div>
                        </div>
                    </>
                )
                break;
            case 2:
                return (
                    <>
                        <div className={styles.fechamentoStatus}>
                            <div className={styles.bloco1}>
                                Muito bem, o seu caixa está aberto agora é só trabalhar...<br/><br/>
                                Terminou o seu dia de trabalho?<br/>
                                Clique no botão abaixo para terminar.
                            </div>
        
                            <div className={styles.bloco2Meio} onClick={() => salvarFechamento(false)}>
                                <p>Caixa aberto</p>
                            </div>
                        </div>
                    </>
                )
                break;
            case 3:
                return (
                    <>
                        <div className={styles.fechamentoStatus}>
                            <div className={styles.bloco1}>
                                Trabalho concluído. Parabéns!<br/><br/>
                                Dia de hoje {moment(new Date()).format("DD/MM/YYYY")}. <br/><br/>
                                Até amanha!
                            </div>
        
                            <div className={styles.bloco2Fim}>
                                <p>Caixa fechado</p>
                            </div>
                        </div>
                    </>
                )
                break;
            case 4:
                return (
                    <>
                        <div className={styles.fechamentoStatus}>
                            <div className={styles.bloco1}>
                                Ooops acho que você esqueceu de fechar o caixa ontem =/<br/><br/>
                                Por favor feche o caixa de ontem para que possamos calcular os seus 
                                ganhos sem maiores problemas.<br/>
                            </div>
        
                            <div className={styles.bloco2Anterior} onClick={() => salvarFechamentoAnterior(fechamentoAnterior)}>
                                <p>Fechar Caixa Anterior</p>
                            </div>
                        </div>
                    </>
                )
                break;
        
            default:
                break;
        }

    }

    function estadoAlerta(){
        alerta == true ? setAlerta(false) : setAlerta(true);
    }

    function chamarAlert(tipo: string, mensagem: string){

        setAlertatipo(tipo);
        setAlertamsg(mensagem);
        estadoAlerta();

    }

    function cubo(condition: number){
        
        switch (condition) {
            case 1:
                router.push("/fornecedorListar");
                break;
            case 2:
                router.push("/clienteListar");
                break;
            case 3:
                router.push("/produto");
                break;
            case 4:
                router.push("/vendas");
                break;
            default:
                break;
        }
        
    }

    function buscarUsers(){
        api({
            method: 'GET',
            url: '/buscarUltimosUsers'
        }).then( res => {
            setUsuarios(res.data.usuarios);
        })
    }

    async function buscarNomeUser(){
        
        var autenticacao = new Autenticacao();
        var tokenLogado = autenticacao.userLogado();

        if(tokenLogado){
            var userLogado = await autenticacao.usuarioLogado(tokenLogado)

            setNomeuser(userLogado.nome);
        }

    }

}

export default verificarAutenticidade(Home);
