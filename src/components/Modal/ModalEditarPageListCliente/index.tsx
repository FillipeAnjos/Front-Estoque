import { FormEvent, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from "../ModalEditarPageListCliente/styles.module.scss";
import { FaPencilAlt } from "react-icons/fa";
import { api } from '../../../services/api';
import { useRouter } from 'next/router';

interface IProdutoEditar{
    categoria: string;
    cor: string;
    created_at: Date;
    descricao: Date;
    id: number
    obs: string;
    produto: string;
    status: boolean;
    tamanho: string;
    updated_at: Date;
}

export function ModalEditarPageListCliente(props: any){

    //console.log(props.clienteSelecionado);

    const [open, setOpen] = useState(false);
    
    const [codigo, setCodigo] = useState(0);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [genero, setGenero] = useState('');
    const [civil, setCivil] = useState('');
    const [uf, setUf] = useState('');
    const [rg, setRg] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState(0);
    const [tel, setTel] = useState('');
    const [cel, setCel] = useState('');
    const [email, setEmail] = useState('');




    
    const [produto, setProduto] = useState('');
    const [categoria, setCategoria] = useState('0');
    const [descricao, setDescricao] = useState('');
    const [cor, setCor] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [valor, setValor] = useState('0');
    const [obs, setObs] = useState('');
    const [status, setStatus] = useState(true);

    const router = useRouter();

    function abrirModal() {
        setOpen(true);
        setCodigo(props.clienteSelecionado.id);
        setNome(props.clienteSelecionado.nome);
        setCpf(props.clienteSelecionado.cpf);
        setNascimento(props.clienteSelecionado.nascimento);
        setGenero(props.clienteSelecionado.genero);
        setCivil(props.clienteSelecionado.civil);
        setUf(props.clienteSelecionado.uf);
        setRg(props.clienteSelecionado.rg);
        setEndereco(props.clienteSelecionado.rua);
        setNumero(props.clienteSelecionado.numero);
        setTel(props.clienteSelecionado.telefone);
        setCel(props.clienteSelecionado.celular);
        setEmail(props.clienteSelecionado.email);




        





        setCodigo(props.clienteSelecionado.id);
        setProduto(props.clienteSelecionado.produto);
        //setCategoria(props.clienteSelecionado.categoria);
        //setDescricao(props.clienteSelecionado.descricao);
        //setCor(props.clienteSelecionado.cor);
        //setTamanho(props.clienteSelecionado.tamanho);
        //setValor(props.clienteSelecionado.valor);
        //setObs(props.clienteSelecionado.obs);
        //setStatus(props.clienteSelecionado.status);
    }

    const fecharModal = () => setOpen(false);

    async function Editar(event: FormEvent){
        event.preventDefault();

        var dados = {
            id: codigo,
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
            url: '/editarCliente',
            data: {
                param: dados
            }
        }).then(res => {
            
            if(res.data.cliente.error){
                alert(res.data.cliente.msg);
                return false;
            }

            fecharModal();
    
            alert(res.data.cliente.msg);
            
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

                            <h2>Editar Cliente</h2>
                            
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
                                    Data Nascimento
                                    <input type="date" maxLength={30} value={nascimento} onChange={ (event) => setNascimento(event.target.value) } />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.campos}>
                                <label>
                                    CPF
                                    <input type="text" maxLength={20} value={cpf} onChange={ (event) => setCpf(event.target.value) } />
                                </label>
                                <label>
                                    RG
                                    <input type="text" maxLength={30} value={rg} onChange={ (event) => setRg(event.target.value) } />
                                </label>
                                <label>
                                    Genero
                                    <select value={genero} onChange={ (event) => setGenero(event.target.value) }>
                                        <option value="m">Masculino</option>
                                        <option value="f">Feminino</option>
                                        <option value="o">Outros</option>
                                    </select>
                                </label>
                            </div>

                            <br/>

                            <div className={styles.campos}>
                                <label>
                                    Email
                                    <input type="text" maxLength={150} value={email} onChange={ (event) => setEmail(event.target.value)} />
                                </label>
                                <label>
                                    Est. Civil
                                    <input type="text" maxLength={30} value={civil} onChange={ (event) => setCivil(event.target.value)} />
                                </label>
                                <label>
                                    UF
                                    <input type="text" maxLength={2} value={uf} onChange={ (event) => setUf(event.target.value)} />
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
                                <label>
                                    Telefone
                                    <input type="text" maxLength={50} value={tel} onChange={ (event) => setTel(event.target.value)} />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.campos}>
                                <label>
                                    Celular
                                    <input type="text" maxLength={50} value={cel} onChange={ (event) => setCel(event.target.value)} />
                                </label>
                            </div>
    
                            <br/>

                            <div className={styles.campos}>
                                <button>Atualizar Cliente</button>
                            </div>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}