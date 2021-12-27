import { FormEvent, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from "../ModalEditarQuantidadeProduto/styles.module.scss";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from 'next/router';
import { api } from '../../../services/api';

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

export function ModalEditarQuantidadeProduto(props: any){

    //console.log(props);

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
    const [unidade, setUnidade] = useState(0);
    const [entradasaida, setEntradasaida] = useState('');

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
        setUnidade(props.produtoSelecionado.quantidade);
    }

    const fecharModal = () => setOpen(false);

    async function Editar(event: FormEvent){
        event.preventDefault();

        if(unidade == null || entradasaida == ''){
            alert("Favor informar o tipo unidade e a unidade.");
            return false;
        }

        var dados = {
            id_produto: codigo,
            //produto: produto,
            //categoria: categoria,
            //descricao: descricao,
            //cor: cor,
            //tamanho: tamanho,
            valor: parseInt(valor.toString().replace(",", ".")),
            //obs: obs,
            //status: status,
            entrada_saida: entradasaida,
            unidade: unidade,
            acao: 'Edicao'
        }

        if(confirm("Tem certeza que deseja alterar a Quantidade?")){

            api({
                method: 'POST',
                url: '/editarUnidade',
                data: {
                    param: dados
                }
            }).then((res) => {
                if(res.data.unidade.success){
                    alert(res.data.unidade.success);
                    
                    fecharModal();
                    router.push('/home');
                }else{
                    fecharModal();
                    alert(res.data.unidade.error);
                }
            })

        }

    }

    return (
        <>
            <h4 title="Alterar quantidade?" className={styles.iconEditar} onClick={ () => abrirModal() }>
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

                            <h2>Editar Quantidade do Produto</h2>
                            
                            <br/>
                            
                            <div className={styles.codNome}>
                                <label>
                                    Código
                                    <input type="text" disabled maxLength={10} value={codigo} />
                                </label>
                                <label>
                                    Produto
                                    <input type="text" disabled maxLength={250} value={produto} onChange={ (event) => setProduto(event.target.value) } />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <label>
                                    Categoria
                                    <select value={categoria} disabled onChange={ (event) => setCategoria(event.target.value) }>
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
                                    <input type="text" disabled maxLength={250} value={descricao} onChange={ (event) => setDescricao(event.target.value) }/>
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <label>
                                    Cor
                                    <input type="text" disabled maxLength={30} value={cor} onChange={ (event) => setCor(event.target.value)} />
                                </label>
                                <label>
                                    Tamanho
                                    <input type="text" disabled maxLength={10} value={tamanho} onChange={ (event) => setTamanho(event.target.value)} />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                {/*<label>
                                    Valor
                                    <input type="text" disabled maxLength={30} value={valor} onChange={ (event) => setValor(event.target.value)} />
                                </label>*/}
                                <label className={styles.unidade}>
                                    Unidade
                                    <select value={entradasaida} onChange={ (event) => setEntradasaida(event.target.value) }>
                                        <option value="">Selecione</option>
                                        <option value="1">Entrada</option>
                                        <option value="0">Saída</option>
                                    </select>
                                    <input type="number" maxLength={30} value={unidade} onChange={ (event) => setUnidade(parseInt(event.target.value))} />
                                </label>
                            </div>

                            <br/>

                            <div className={styles.codNome}>
                                <label>
                                    Observação<br/>
                                    <textarea disabled cols={5} rows={5} maxLength={500} value={obs} onChange={ (event) => setObs(event.target.value)} />
                                </label>
                            </div>

                            <div className={styles.codNome}>
                                <button>Atualizar Quantidade</button>
                            </div>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}