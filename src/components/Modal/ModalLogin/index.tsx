import { FormEvent, useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from "../ModalEditarPageListProduto/styles.module.scss";
import { api } from '../../../services/api';
import { useRouter } from 'next/router';
import { AiOutlineLogin } from 'react-icons/ai';
import { setCookie } from 'nookies';


export function ModalLogin(props: any){

    const [open, setOpen] = useState(false);
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const router = useRouter();

    function abrirModal() {
        setOpen(true);
    }

    const fecharModal = () => setOpen(false);

    return (
        <>
            <h4 title="Deseja Logar?" className={styles.iconEditar} onClick={ () => abrirModal() }>
                <AiOutlineLogin />
            </h4>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={fecharModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={styles.estilo}>
                        <form onSubmit={logar}>

                            <h2>Login</h2>
                            
                            <br/>
                            
                            <div className={styles.codNome}>
                                <label>
                                    Email
                                    <input type="text" value={email} onChange={ (event) => setEmail(event.target.value) } />
                                </label>
                                <label>
                                    Senha
                                    <input type="password" maxLength={250} value={senha} onChange={ (event) => setSenha(event.target.value) } />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <button>Logar</button>
                            </div>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )

    async function logar(event: FormEvent){
        event.preventDefault();

        var dados = {
            email: email,
            senha: senha
        }

        const tokenLogado = await logarUser(dados);

        if(tokenLogado == false){
            alert("Erro. Email e/ou senha incorretos.");
            setEmail('');
            setSenha('');
            //fecharModal();
            return false;
        }

        setCookie(undefined, 'nextauth.estoque.token', tokenLogado, {
            maxAge: 24 * 60 * 60 // 24 hours
        })
  
        props.estadoLogar();// Função do componente pai
        router.push('/');
        fecharModal();
    }

    async function logarUser(dadosUsuario) {

        const { email, senha } = dadosUsuario;

        let credenciais = { email: email, senha: senha };

        var token = await api({
                            method: 'post',
                            url: '/login',
                            data: {
                                param: credenciais
                            }
                    }).then(function(res) {
  
                        if(!res.data.user.status){
                            return false;
                        }else{
                            return res.data.user.token;
                        }
                        
                    })
  
        return token;
  
    }


}