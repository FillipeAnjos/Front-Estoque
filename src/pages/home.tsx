import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/HomePage/styles.module.scss';
import imgHome from '../../public/imagens/home/home1.png';
import Image from "next/image";
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

function Home(props: any){

    const [caixa, setCaixa] = useState(0);

    useEffect( () => {
        
        buscarStatusCaixa();

    }, [])

    function buscarStatusCaixa(){
        api({
            method: 'GET',
            url: '/buscarStatusCaixa'
        }).then((res) => {
            if(res.data.fechamento == 1){
                setCaixa(1)
            }else if(res.data.fechamento == 2){
                setCaixa(2)
            }else{
                setCaixa(3)
            }
        })
    }

    function cubo(condition: number){
        
        switch (condition) {
            case 1:
                console.log('Fornecedores');
                break;
            case 2:
                console.log('Clientes');
                break;
            case 3:
                console.log('Produtos');
                break;
            case 4:
                console.log('Vendas');
                break;
            default:
                break;
        }
        
    }

    function salvarFechamento(param: boolean){

        if(param == true){
            setCaixa(2);
        }else{
            setCaixa(3);
        }

    }

    function fechamento(condition: number){

        switch (condition) {
            case 1:
                return (
                    <>
                        <div className={styles.fechamentoStatus}>
                            <div className={styles.bloco1}>
                                Show de Bola
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
                                Show de Bola
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
                                Show de Bola
                            </div>
        
                            <div className={styles.bloco2Fim}>
                                <p>Caixa fechado</p>
                            </div>
                        </div>
                    </>
                )
                break;
        
            default:
                break;
        }

    }

    const {data: session} = useSession();

    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>
            <div className={styles.container}>
                <h2>Page Home</h2>
                <br/>

                <div className={styles.caixa1}>
                    <div className={styles.textoCaixa1Topo}>
                        <h2>Olá. {/*session.user.name.nome*/}Falta fazer! </h2>
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
                    <ProgressoMensal tipo={"bar"} />
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
                    {/*
                    <div className={styles.modelo1}>
                        <div>
                            Abrir Caixa 
                        </div>
                        
                    </div>

                    <div className={styles.modelo2}>
                        <div>
                            Fechar Caixa
                        </div>

                    </div>
                    */}

                    {/* #00af00   #df0000 */}

                    { fechamento(caixa) }                    

                </div>

                <h4 className={styles.textoMembros}>Membros</h4>
                <div className={styles.caixa5}>
                    
                    <div className={styles.usersSistem}>
                        <div>
                            <h3><FaUserCircle /></h3>
                            <p>Fillipe</p>
                            <h5>dos Anjos</h5>
                        </div>

                        <div>
                            <h3><FaUserCircle /></h3>
                            <p>Fabiana</p>
                            <h5>Leal</h5>
                        </div>

                        <div>
                            <h3><FaUserCircle /></h3>
                            <p>Fiorella</p>
                            <h5>Leal</h5>
                        </div>

                        <div>
                            <h3><FaUserCircle /></h3>
                            <p>Ruth</p>
                            <h5>dos Anjos</h5>
                        </div>

                        <div>
                            <h3><FaUserCircle /></h3>
                            <p>Alfredo</p>
                            <h5>Pereira</h5>
                        </div>

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
}

export default verificarAutenticidade(Home);
