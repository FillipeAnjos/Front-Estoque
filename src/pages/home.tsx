import Head from "next/head";
import verificarAutenticidade from "../utils/verificarAutenticidade";
import styles from '../components/HomePage/styles.module.scss';
import imgHome from '../../public/imagens/home/home1.png';
import Image from "next/image";
import { WiThermometerExterior, WiCloud } from 'react-icons/wi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BiBarChart } from 'react-icons/bi';
import { RiBarcodeFill, RiTruckFill } from 'react-icons/ri';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoIosSettings, IoLogoFacebook, IoIosNotifications, IoMdHelpCircleOutline, IoMdPerson, IoIosPaper, IoLogoInstagram } from 'react-icons/io';
import { useSession } from "next-auth/react";
import ProgressoMensal from '../components/ProgressoMensal';

function Home(){

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
                            A tecnologia veio par agilizar o nosso trabalho.
                        </p>
                        <div className={styles.temperatura}>
                            <h3><WiThermometerExterior /></h3>
                            <h4>+ 25°C Temperatura</h4>
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
                            <h1><RiTruckFill /></h1>
                            <h4>Fornecedores</h4>
                        </div>
                    </div>

                    <div className={styles.cubo} onClick={ () => cubo(2) }>
                        <div className={styles.cubo2}>
                            <h1><IoPeopleSharp /></h1>
                            <p>Clientes</p>
                        </div>
                    </div>

                    <div className={styles.cubo} onClick={ () => cubo(3) }>
                        <div className={styles.cubo3}>
                            <h1><RiBarcodeFill /></h1>
                            <h4>Produtos</h4>
                        </div>
                    </div>

                    <div className={styles.cubo} onClick={ () => cubo(4) }>
                        <div className={styles.cubo4}>
                            <h1><AiFillDollarCircle /></h1>
                            <h4>Vendas</h4>
                        </div>
                    </div>

                </div>

                <div className={styles.caixa3}>
                    <div className={styles.textProgresso}>
                        <h2><BiBarChart /></h2><p>Progresso Mensal</p>
                    </div>
                    <ProgressoMensal />
                </div>
                
            </div>

            <div className={styles.container2}>

                <div className={styles.redesSociais}>
                    <h2 title="Suas anotações"><IoIosPaper /></h2>
                    <h2 title="Configurações"><IoIosSettings /></h2>
                    {/*<h2 title="9dades"><IoIosNotifications /></h2>*/}
                    <h2 title="Usuários do sistema"><IoMdPerson /></h2>
                    <h2 title="Instagram"><IoLogoInstagram /></h2>
                    <h2 title="Facebook"><IoLogoFacebook /></h2>
                    <h2 title="Ajuda"><IoMdHelpCircleOutline /></h2>
                </div>

                <div className={styles.caixa4}>
                    
                    <div className={styles.modelo1}>
                        <div>
                            Caixinha 1
                        </div>

                        <div>
                            Caixinha 2
                        </div>
                    </div>

                    <div className={styles.modelo2}>
                        <div>
                            Caixinha 3
                        </div>

                        <div>
                            Caixinha 4
                        </div>
                    </div>

                </div>

                <h3 className={styles.TextoMembros}>Membros</h3>
                <div className={styles.caixa5}>
                    
                    <div >
                        <div>
                            User 1
                        </div>

                        <div>
                            User 2
                        </div>

                        <div>
                            User 3
                        </div>

                        <div>
                            User 4
                        </div>

                        <div>
                            User 5
                        </div>

                    </div>

                </div>

            </div>
            
        </>
    )
}

export default verificarAutenticidade(Home);