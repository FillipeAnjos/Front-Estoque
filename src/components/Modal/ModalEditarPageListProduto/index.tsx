import { FormEvent, useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from "../ModalEditarPageListProduto/styles.module.scss";
import { FaPencilAlt } from "react-icons/fa";
import { api } from '../../../services/api';
import { contextProdutos } from '../../../hooks/useContextProdutos';
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

export function ModalEditarPageListProduto(props: any){

    const [open, setOpen] = useState(false);
    
    const [codigo, setCodigo] = useState(0);
    const [produto, setProduto] = useState('');
    const [categoria, setCategoria] = useState('0');
    const [descricao, setDescricao] = useState('');
    const [cor, setCor] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [valor, setValor] = useState('0');
    const [obs, setObs] = useState('');
    const [status, setStatus] = useState(true);

    let { editarProduto } = useContext(contextProdutos);
    const router = useRouter();

    function abrirModal() {
        setOpen(true);
        setCodigo(props.produtoSelecionado.id);
        setProduto(props.produtoSelecionado.produto);
        setCategoria(props.produtoSelecionado.categoria);
        setDescricao(props.produtoSelecionado.descricao);
        setCor(props.produtoSelecionado.cor);
        setTamanho(props.produtoSelecionado.tamanho);
        setValor(props.produtoSelecionado.valor);
        setObs(props.produtoSelecionado.obs);
        setStatus(props.produtoSelecionado.status);
    }

    const fecharModal = () => setOpen(false);

    async function Editar(event: FormEvent){
        event.preventDefault();

        if( codigo == null || 
            produto == '' || 
            categoria == '' || 
            descricao == '' || 
            cor == '' || 
            tamanho == '' || 
            valor == '0' || 
            obs == ''){
                alert("Favor preencher todos os campos.");
                return false;
        }

        var dados = {
            codigo: codigo,
            produto: produto,
            categoria: categoria,
            descricao: descricao,
            cor: cor,
            tamanho: tamanho,
            valor: parseInt(valor.toString().replace(",", ".")),
            obs: obs,
            status: status
        }
        
        await editarProduto(dados);

        fecharModal();

        alert("Produto alterado com sucesso!");
        
        router.push('/home');

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

                            <h2>Editar Produto</h2>
                            
                            <br/>
                            
                            <div className={styles.codNome}>
                                <label>
                                    Código
                                    <input type="text" disabled maxLength={10} value={codigo} />
                                </label>
                                <label>
                                    Produto
                                    <input type="text" maxLength={250} value={produto} onChange={ (event) => setProduto(event.target.value) } />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <label>
                                    Categoria
                                    <select value={categoria} onChange={ (event) => setCategoria(event.target.value) }>
                                        <option value="Blusa">Blusa</option>
                                        <option value="Calca">Calça</option>
                                        <option value="Peca unica">Peça única</option>
                                        <option value="Conjunto">Conjunto</option>
                                        <option value="Assessorios">Assessórios</option>
                                        <option value="Calcados">Calçados</option>
                                    </select>
                                </label>
                                <label>
                                    Descrição
                                    <input type="text" maxLength={250} value={descricao} onChange={ (event) => setDescricao(event.target.value) }/>
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <label>
                                    Cor
                                    <input type="text" maxLength={30} value={cor} onChange={ (event) => setCor(event.target.value)} />
                                </label>
                                <label>
                                    Tamanho
                                    <input type="text" maxLength={10} value={tamanho} onChange={ (event) => setTamanho(event.target.value)} />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <label>
                                    Valor
                                    <input type="text" maxLength={30} value={valor} onChange={ (event) => setValor(event.target.value)} />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <label>
                                    Observação<br/>
                                    <textarea cols={5} rows={5} maxLength={500} value={obs} onChange={ (event) => setObs(event.target.value)} />
                                </label>
                            </div>

                            <div className={styles.codNome}>
                                <button>Atualizar Produto</button>
                            </div>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}