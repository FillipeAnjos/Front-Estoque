import Head from "next/head";
import styles from "../components/venda/styles.module.scss";
import { api } from "../services/api";
import VendaOff from "./vendaOff";
import { AiFillCaretDown } from 'react-icons/ai';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { FaTrashAlt } from "react-icons/fa";

import verificarAutenticidade from "../utils/verificarAutenticidade";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ActionAlerts from "../components/Alert";
import Popover from '@mui/material/Popover';

interface IProdutoSelecionado{
    categoria: string;
    cor: string;
    created_at: string;
    descricao: string;
    id: number;
    id_produto: number;
    obs: string;
    produto: string;
    quantidade: number
    status: boolean
    tamanho: string;
    updated_at: string;
    valor: number;
}

function Venda(){

    const {data: session} = useSession();

    const router = useRouter();

    // ------------------------ Alerta -----------------------
        const [alerta, setAlerta] = useState(false);
        const [alertatipo, setAlertatipo] = useState('');
        const [alertamsg, setAlertamsg] = useState('');
    // -------------------------------------------------------

    var idUsuario = null;
    if(session){
        idUsuario = session.user.email;
    }
    
    const [usuariosadmin, setUsuariosadmin] = useState([]);
    const [caixa, setCaixa] = useState(true);

    const [produtos, setProdutos] = useState([]);
    const [addprodutos, setAddprodutos] = useState([]);
    const [addprodutosbanco, setAddprodutosbanco] = useState([]);

    const [id, setId]           = useState(0);
    const [produto, setProduto] = useState('');
    const [valor, setValor]     = useState(0);
    const [unidade, setUnidade] = useState(0);

    const [accordian, setAccordian] = useState(true);

    // ------------------------ Ajuda -----------------------
        const [ajuda, setAjuda] = useState(null);

        const ajudaOpen = (event: any) => {
            setAjuda(event.currentTarget);
        };

        const ajudaClose = () => {
            setAjuda(null);
        };

        const open = Boolean(ajuda);
        const idAjuda = open ? 'simple-popover' : undefined;
    // -------------------------------------------------------

    const [subtotal, setSubtotal]           = useState('');
    const [desconto, setDesconto]           = useState('');
    const [valortotal, setValortotal]       = useState('');
    const [valorrecebito, setValorrecebido] = useState('');
    const [valorrestante, setValorrestante] = useState('');
    const [troco, setTroco] = useState('');

    const [rebidodisabled, setRebidodisabled] = useState(true);

    const [selecionarradio, setSelecionarradio] = useState('a');
    const trocarRadio = (event: any) => {
        setSelecionarradio(event.target.value);
    };

    const [checkbox, setCheckbox] = useState({
        dinheiro: false,
        pix: false,
        credito: false,
        debito: false,
        loja: false,
    });

    const [vendedor, setVendedor] = useState(parseInt(idUsuario));
    const [obs, setObs] = useState('');

    const trocarPagamento = name => event => {

        if(name != 'dinheiro'){
            checkbox.dinheiro = false;
        }
        if(name != 'pix'){
            checkbox.pix = false;
        }
        if(name != 'credito'){
            checkbox.credito = false;
        }
        if(name != 'debito'){
            checkbox.debito = false;
        }
        if(name != 'loja'){
            checkbox.loja = false;
        }

        setCheckbox({ ...checkbox, [name]: event.target.checked });

    };

    useEffect(() => {
        buscarStatusCaixa();
        buscarUsuarios();
        buscarProdutos();
    }, [])

    return caixa == true ? (
        <>
            <Head>
                <title>Venda</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.containerDescricaoIcon}>

                    <h2>Venda</h2>
                    
                    <h2 title="Click-Me" onClick={ajudaOpen}><IoMdHelpCircleOutline /></h2>
                        <Popover
                            id={idAjuda}
                            open={open}
                            anchorEl={ajuda}
                            onClose={ajudaClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2 }}>
                                Importante.<br/><br/>
                                Ao adicionar os produtos certifique de calcular os valores,<br/>
                                apertando o botão "Calcular".<br/>
                                Se caso você depois de calcular os valores tiver que adicionar<br/>
                                mais um produto terá que apertar novamente no botão calcular,<br/>
                                para também calcular os valores de novo, caso contrario os<br/>
                                valores não irá corresponder aos produtos selecionados.<br/>
                            </Typography>
                        </Popover>

                </div>
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

                <div className={styles.radios}>
                    <div>
                        <p>Código</p>    
                        <Radio
                            checked={selecionarradio === 'a'}
                            onChange={trocarRadio}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                    </div>
                    
                    <div>
                        <p>Produto</p>    
                        <Radio
                            checked={selecionarradio === 'b'}
                            onChange={trocarRadio}
                            value="b"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                    </div>
                </div>

                <br/>

                <div className={styles.containerOpcoes}>
                    <Stack spacing={2} sx={{ width: 190 }}>
                        <Autocomplete
                            disabled={selecionarradio != 'a' ? true : false}
                            freeSolo
                            id="free-solo-2-demo"
                            getOptionLabel={(p) => p.id.toString() }
                            disableClearable
                            onChange={(event, value) => produtoSelecionado(value)}
                            options={produtos.map((option) => option)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecione o Código"
                                InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                }}
                            />
                            )}
                        />
                    </Stack>

                    <Stack spacing={2} sx={{ width: 300 }}>
                        <Autocomplete
                            disabled={selecionarradio == 'a' ? true : false}
                            freeSolo
                            id="free-solo-2-demo1"
                            getOptionLabel={(p) => p.produto }
                            disableClearable
                            onChange={(event, value) => produtoSelecionado(value)}
                            options={produtos.map((option) => option)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecione o Produto"
                                InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                }}
                            />
                            )}
                        />
                    </Stack>
                </div>

                <div className={styles.containerResultado}>
                    <>
                        <TextField className={styles.resultadoValor} label="Valor" value={valor} disabled />

                        <TextField className={styles.resultadoUnidade} type="number" label="Unidade" value={unidade} onChange={ (event) => setUnidade(parseInt(event.target.value)) } />
                    </>
                    <button onClick={ () => addProduto() }>Adicionar Produto</button>
                </div>

                <br/>

                <Accordion expanded={accordian} className={styles.accordian}>
                    <AccordionSummary
                        onClick={() => expandirAccordian()}
                        expandIcon={<AiFillCaretDown />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Quadro de Pagamento</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>

                        <div className={styles.containerVenda}>
                            
                            <div className={styles.cubo1}>
                                    <h3>Forma de Pagamento</h3>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={checkbox.dinheiro} onChange={trocarPagamento('dinheiro')} value="dinheiro" />} label="Dinheiro" />
                                        
                                        <FormControlLabel control={<Checkbox checked={checkbox.pix} onChange={trocarPagamento('pix')} value="pix" />} label="Pix" />
                                        
                                        <FormControlLabel control={<Checkbox checked={checkbox.credito} onChange={trocarPagamento('credito')} value="credito" color="primary" />} label="Cartão de Crédito" />
                                        
                                        <FormControlLabel control={<Checkbox checked={checkbox.debito} onChange={trocarPagamento('debito')} value="debito" />} label="Cartão de Débito" />
                                        
                                        <FormControlLabel control={<Checkbox checked={checkbox.loja} onChange={trocarPagamento('loja')} value="loja" />} label="Créditos Loja" />
                                        
                                    </FormGroup>
                            </div>

                            <div className={styles.cubo2}>
                                    <h3>Vendedor</h3>
                                    <select value={vendedor} onChange={ (event) => setVendedor(parseInt(event.target.value)) }>
                                        {usuariosadmin.map(item => (
                                            <option value={item.id} selected={item.id == idUsuario}>{item.nome}</option>
                                        ))}
                                    </select>
                                    <br/><br/>
                                    <h4>Observação</h4>
                                    <textarea rows={5} value={obs} onChange={ (event) => setObs(event.target.value) } placeholder="Não incluir aspas na observação.">

                                    </textarea>
                            </div>

                            <div className={styles.cubo3} >
                                <h3>Produtos Selecionado</h3>
                                {addprodutos.length != 0 ? 
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>Código</td>
                                                    <td>Produto</td>
                                                    <td>Valor</td>
                                                    <td>Unidade</td>
                                                    <td>Ação</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {addprodutos.map(item => (
                                                    <tr>
                                                        <td>
                                                            {item.id}
                                                        </td>
                                                    <td>
                                                        {item.produto}
                                                    </td>
                                                    <td>
                                                        R${item.valor}
                                                    </td>
                                                    <td>
                                                        {item.unidade}
                                                    </td>
                                                    <td>
                                                        <span>
                                                            <h4 onClick={ () => excluirItem(item.id) }><FaTrashAlt title="Excluir item?"/></h4>
                                                        </span>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                : <p>Você ainda não possui itens adicionado.</p>}
                            </div>

                        </div>

                        <br/>
                        <div className={styles.calcularValor}>
                            <button title="Deseja calcular os valores?" onClick={ () => calcularValor() }>Calcular</button>
                        </div>

                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/>

                <div className={styles.valores1}>
                    <label>
                        Sub Total<br/>
                        <input type="text" maxLength={10} value={subtotal} onChange={ (event) => setSubtotal(event.target.value) } disabled/>
                    </label>
                    <label>
                        Desconto<br/>
                        <input type="text" maxLength={10} value={desconto} onChange={ (event) => setDesconto(event.target.value) } onBlur={ () => calcularDesconto() }/>
                    </label>
                    <label>
                        Valor Total<br/>
                        <input type="text" maxLength={10} value={valortotal} onChange={ (event) => setValortotal(event.target.value) } disabled/>
                    </label>
                </div>

                <br/>

                <div className={styles.valores2}>
                    <label>
                        Valor Recebido<br/>
                        <input type="text" maxLength={10} value={valorrecebito} onChange={ (event) => setValorrecebido(event.target.value) } onBlur={ () => calcularTroco() } disabled={rebidodisabled}/>
                    </label>
                    <label>
                        Valor Restante<br/>
                        <input type="text" maxLength={10} value={valorrestante} onChange={ (event) => setValorrestante(event.target.value) } disabled/>
                    </label>
                    <label>
                        Troco<br/>
                        <input type="text" maxLength={10} value={troco} onChange={ (event) => setTroco(event.target.value) } disabled/>
                    </label>
                </div>

                <div className={styles.realizarVenda}>
                    <button title="Deseja realizar essa venda?" onClick={ () => realizarVenda() }>Realizar Venda</button>
                </div>
                
            </div>
        </>
    )
    :
    (
        <VendaOff />
    )

    function realizarVenda(){

        var valoresDados = {
            subtotal,
            desconto,
            valortotal,
            valorrecebito,
            valorrestante,
            troco
        }

        var dados = {
            id_user: vendedor,
            itens: addprodutos,
            modalidade: checkbox,
            valores: valoresDados,
            obs: obs
        }

        api({
            method: 'POST',
            url: '/realizarVenda',
            data: {
                param: dados
            }
        }).then((res) => {
            
            if(res.data.venda.error){
                alert(res.data.venda.msg);
                return false;
            }
            
            alert(res.data.venda.msg);
            router.push("/");
            
        })

    }

    function calcularValor(){

        if(checkbox.dinheiro == false && checkbox.pix == false && checkbox.credito == false && checkbox.debito == false && checkbox.loja == false){
            alert("Escolha uma forma de pagamento!");
            return false
        }

        var valorSomado = 0;

        addprodutos.forEach((element, index) => {
            var conta = element.valor * element.unidade;
            index != 0 ? valorSomado += conta : valorSomado = conta;
        });
        
        setSubtotal(valorSomado.toFixed(2));
        setValortotal(valorSomado.toFixed(2));
        setValorrestante(valorSomado.toFixed(2));

        if(checkbox.pix == true || checkbox.credito == true || checkbox.debito == true){
            setRebidodisabled(true)
        }else{
            setRebidodisabled(false)
        }

    }

    function calcularDesconto(){

        const novoValorTotal = parseFloat(subtotal) - parseFloat(desconto);

        setValortotal(novoValorTotal.toFixed(2));
        setValorrestante(novoValorTotal.toFixed(2));

    }

    function calcularTroco(){

        if(parseInt(valorrecebito) <= parseInt(valorrestante)){
            return false;
        } 

        var novoValorTroco = parseFloat(valorrecebito) - parseFloat(valorrestante);

        setTroco(novoValorTroco.toFixed(2));

    }
    
    function buscarProdutos(){
        api({
            method: 'GET',
            url: '/listarProdutos'
        }).then((res) => {
            setProdutos(res.data.produtos);
        })
    }

    function produtoSelecionado(sel: IProdutoSelecionado){
        setId(sel.id);
        setProduto(sel.produto);
        setValor(sel.valor);
        setUnidade(sel.quantidade);
    }

    async function addProduto(){

        var dadosParam = {
            id_produto: id,
            unidade: unidade
        }

        var condicaoQtd = await api({
                                method: 'POST',
                                url: '/verificarQuantidadeItem',
                                data: {
                                    param: dadosParam
                                }
                            }).then(async (res) => {
                                if(res.data.unidade.error){
                                    chamarAlert('error', res.data.unidade.error);
                                    return false;
                                }

                                return true;
                            })

        if(!condicaoQtd){
            return false;
        }

        {/* ******************************************************************************************** */}

        //const valorAinserirBanco = {id_produto: id, produto: produto, valor_atual: valor, unidade: unidade };

        //const valoresBanco = [...addprodutosbanco];
        //valoresBanco.push(valorAinserirBanco);
        //setAddprodutosbanco(valoresBanco);

        {/* ******************************************************************************************** */}

        const valorAinserir = {id, produto, valor, unidade};

        const valores = [...addprodutos];
        valores.push(valorAinserir);
        setAddprodutos(valores);

    }

    function excluirItem(idParam: number){
        /* 
            ----- Lógica para excluir o item do array -----

            Primeiro for abaixo: Exclui do array o id do item vindo por parametro
            Segundo for abaixo : Cria um array novo populo o array de produtos adicionados e a 
                                cada iteração eu vejo a posição do array que está com o valor 
                                undefined e não adiciono no novo array, terminou a verificação 
                                eu adiciono a nova lista de itens no array do produtos adicionados 
        */
        
        for( var i = 0; i < addprodutos.length; i++){ 
            if(addprodutos[i].id === idParam){
                delete addprodutos[i];
            }
        }

        // -----------------------------------------------

        var arrayNovo = [];

        for( var i = 0; i < addprodutos.length; i++){ 
            if(addprodutos[i] != undefined){
                arrayNovo.push(addprodutos[i]);
            }
        }

        setAddprodutos(arrayNovo);
    }

    function expandirAccordian(){
        setAccordian(!accordian)
    }

    function estadoAlerta(){
        alerta == true ? setAlerta(false) : setAlerta(true);
    }

    function chamarAlert(tipo: string, mensagem: string){
        setAlertatipo(tipo);
        setAlertamsg(mensagem);
        estadoAlerta();
    }

    function buscarUsuarios(){
        api({
            method: 'GET',
            url: '/buscarUsers'
        }).then((res) => {
            setUsuariosadmin(res.data.usuarios);
        })
    }

    function buscarStatusCaixa(){
        api({
            method: 'GET',
            url: '/buscarStatusCaixa'
        }).then((res) => {
            var cs = res.data.fechamento.caixa;

            cs == 2 ? setCaixa(true) : setCaixa(false);
        })
    }

}

export default verificarAutenticidade(Venda);