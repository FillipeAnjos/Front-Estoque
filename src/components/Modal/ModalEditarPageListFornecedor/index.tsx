import { FormEvent, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from "../ModalEditarPageListFornecedor/styles.module.scss";
import { FaPencilAlt } from "react-icons/fa";
import { api } from '../../../services/api';
import { useRouter } from 'next/router';

export function ModalEditarPageListFornecedor(props: any){

    //console.log(props.fornecedorSelecionado);

    const [open, setOpen] = useState(false);
    
    const [codigo, setCodigo] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [razao, setRazao] = useState('');
    const [falarcom, setFalarcom] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState(0);
    const [cel, setCel] = useState('');

    const router = useRouter();

    function abrirModal() {
        setOpen(true);
        setCodigo(props.fornecedorSelecionado.id);
        setNome(props.fornecedorSelecionado.nome);
        setEmail(props.fornecedorSelecionado.email);
        setCnpj(props.fornecedorSelecionado.cnpj);
        setRazao(props.fornecedorSelecionado.razao);
        setFalarcom(props.fornecedorSelecionado.falarcom);
        setEndereco(props.fornecedorSelecionado.rua);
        setNumero(props.fornecedorSelecionado.numero);
        setCel(props.fornecedorSelecionado.celular);

    }

    const fecharModal = () => setOpen(false);

    async function Editar(event: FormEvent){
        event.preventDefault();

        var dados = {
            id: codigo,
            nome: nome,
            cnpj: cnpj,
            razao: razao,
            falarcom: falarcom,
            endereco: endereco,
            numero: numero,
            cel: cel,
            email: email
        }

        api({
            method: 'POST',
            url: '/editarFornecedor',
            data: {
                param: dados
            }
        }).then(res => {
            
            if(res.data.fornecedor.error){
                alert(res.data.fornecedor.msg);
                return false;
            }

            fecharModal();
    
            alert(res.data.fornecedor.msg);
            
            router.push('/');
            
        })

    }

    return (
        <>
            <h4 title="Editar?" className={styles.iconEditar} onClick={ () => abrirModal() }>
                <FaPencilAlt />
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
                        <form onSubmit={Editar}>

                            <h2>Editar Fornecedor</h2>
                            
                            <br/>
                            
                            <div className={styles.campos}>
                                <label>
                                    Código
                                    <input type="text" disabled maxLength={10} value={codigo} />
                                </label>
                                <label>
                                    Nome
                                    <input type="text" maxLength={150} value={nome} onChange={ (event) => setNome(event.target.value) } />
                                </label>
                                <label>
                                    Razao
                                    <input type="text" maxLength={30} value={razao} onChange={ (event) => setRazao(event.target.value) } />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.campos}>
                                <label>
                                    CNPJ
                                    <input type="text" maxLength={20} value={cnpj} onChange={ (event) => setCnpj(event.target.value) } />
                                </label>
                                <label>
                                    Email
                                    <input type="text" maxLength={150} value={email} onChange={ (event) => setEmail(event.target.value)} />
                                </label>
                                <label>
                                    Celular
                                    <input type="text" maxLength={50} value={cel} onChange={ (event) => setCel(event.target.value)} />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.campos}>
                                <label>
                                    Endereco
                                    <input type="text" maxLength={150} value={endereco} onChange={ (event) => setEndereco(event.target.value)} />
                                </label>
                                <label>
                                    Numero
                                    <input type="number" maxLength={10} value={numero} onChange={ (event) => setNumero(parseInt(event.target.value))} />
                                </label>
                               
                            </div>

                            <br/>

                            <div className={styles.campos}>
                                <button>Atualizar Fornecedor</button>
                            </div>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}