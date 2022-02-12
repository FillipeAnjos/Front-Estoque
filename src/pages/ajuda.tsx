import Head from "next/head";
import styles from "../components/Ajuda/styles.module.scss";
import { AiFillCaretDown } from 'react-icons/ai';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import verificarAutenticidade from "../utils/verificarAutenticidade";

function Ajuda(){

    return (
        <>
            <Head>
                <title>Ajuda</title>
            </Head>
            <div className={styles.container}>
                <h2>Ajuda</h2>
                <hr />

                <br/><br/>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Home</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <b><i>Bloco 1</i></b>: Você irá visuializar algumas informações e avisos.<br/>
                        <b><i>Bloco 2</i></b>: Você ira ver a informações atual do seu caixa, se está fechado ou aberto.<br/>
                        <b><i>Bloco 3</i></b>: Os blocos do meio que tem como descrição fornecedor, clientes, produtos e vendas, cada bloco desse tem o seu listar.<br/>
                        <b><i>Bloco 4</i></b>: Nesse bloco você irá visualizar os ultimos 5 usuários que se cadastrou. <br/>
                        <b><i>Bloco 5</i></b>: Tem o progresso de suas vendas por mês dentro do ano atual, importante frizar que é a quantidade de vendas por mês e não o valor.<br/>
                        <b><i>Bloco 6</i></b>: E por ultimo você tem o quadro de consumo da loja.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Botão Realizar Venda no Realizar Venda</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Ao adicionar os produtos certifique de calcular os valores,<br/>
                        apertando o botão "Calcular".<br/>
                        Se caso você depois de calcular os valores tiver que adicionar<br/>
                        mais um produto terá que apertar novamente no botão calcular,<br/>
                        para também calcular os valores de novo, caso contrario os<br/>
                        valores não irá corresponder aos produtos selecionados.<br/>
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><strong>Formas de Pagamentos ao Realizar a Venda</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Dinheiro: forma de venda em dinheiro vivo. <br/>
                        Pix: forma de venda na modalidade Pix, venda rápida. <br/>
                        Cartão de Crédito: forma de venda na modalidade de cartão crédito, podendo parcelar.<br/>
                        Cartão de Débito: forma de venda, venda rápida também. <br/>
                        Créditos de Loja: forma de venda que o cliente possui um crédito na loja.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><strong>Botão Calcular no Realizar a Venda</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        O botão Calcular ao realizar a venda serve para calcular os valores na sua venda. <br/>
                        Importante: se atentar que todos os campos acima do botão calcular devem ser preenchidos antes de sua ação. <br/>
                        Exemplo: preencha todos os campos acima e somente depois que será necessário a sua ação.<br/>
                        Apertou no botão calcular e mudou algum campo acima, será necessário apertar novamente no Calcular.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/>    

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><strong>Produtos Ativos</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        O que são produtos ativos?<br/>
                        R: Produtos ativos são os produtos que estão em venda na loja, ou seja os produtos que a loja possui <br/>
                        ou os que estão com a quantidade zero porém a loja tem a pretenção de continuar a sua venda.<br/>
                        Exemplo um produto que foi cadastrado e que já não é mais vendido na loja, este produto está inativo.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><strong>Produto Novo</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Produto novo serve para adicionar um produto novo para a loja.<br/>
                        Após cadastrar o produto novo, se faz necessário a inclusão de sua quantidade no menu Balanço.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><strong>Produtos Inativos</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        O que são produtos inativos?<br/>
                        R: Produtos inativos como dito nos produtos ativos, são todos aqueles produtos que a loja um dia vendeu e que agora não mais vende.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><strong>Produtos / Balanço</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        O menu de Balanço serve para duas ocasiões.<br/>
                        1° Para alterar a quantidade de algum produto, exemplo: caso você tenha cadastrado algum produto e pretende incluir a quantidade.<br/>
                        2° Para realizar o balanço de cada mês em cima de cada peça contada no loja. 
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><strong>Produtos / Cadastrar / Categoria</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        O menu categoria serve para cadastrar as categorias dos itens na loja.<br/>
                        Exemplo: Categoria Calçados, serve para descriminar todos os calçados da loja. 
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Vendas / Listar / Vendas</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Nesse menu você irá encontrar todas as suas vendas realizadas com suas respectivas informações atreladas, <br/>
                        Você também irá visualizar a os campos de pesquisar para encontrar a venda desejada. <br/>
                        Importante lembrar que esse item de menu é apenas para visualizar as vendas e não para gerar relatórios de comprovação.                         
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Clientes / Cadastrar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Menu importante pos é aqui que você irá cadastrar os seus clientes. <br/>
                        Importante lembrar que esses clientes não são usuários do sistema e sim clientes da loja.                      
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Clientes / Listar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Menu de listar os clientes já cadastrados.<br/> 
                        Você também pode alterar as suas informações e também com a pode de inativa-los caso deseje.                    
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Fornecedores / Cadastrar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Menu importante pos é aqui que você irá cadastrar os seus fornecedores. <br/>
                        Importante lembrar que esses fornecedores não são usuários do sistema e sim fornecedores da loja.                      
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Fornecedores / Listar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Menu de listar os fornecedores já cadastrados.<br/> 
                        Você também pode alterar as suas informações e também com a pode de inativa-los caso deseje.                    
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Relatórios / Vendas</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        O relatório de vendas é a forma detalhada de suas vendas.<br/>
                        Exemplo: Vamos imaginar que em um determinado dia você fez 10 vendas em 1 único dia, <br/>
                        essas infomrações vão aparecer aqui no relatório de vendas e não no relatório de fechamento.<br/>
                        O relatório de vendas contempla todas as informações de suas vendas seja ela em dias diferentes ou não.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Relatórios / Vendas / Fechamentos</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        O relatório de fechamento é o relatório dos dias trabalhados.<br/>
                        A cada dia trabalhado é contado como uma linha no relatório.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Relatórios / Produtos / Listar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Esse relatório de produtos listar contempla todos os produtos já cadastrado no sistema, seja ele ativo ou não.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Relatórios / Produtos / Listar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Esse relatório de produtos listar contempla todos os produtos já cadastrado no sistema, seja ele ativo ou não.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Relatórios / Clientes / Listar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Esse relatório de clientes listar contempla todos os clientes já cadastrado no sistema, seja ele ativo ou não.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography><strong>Relatórios / Fornecedores / Listar</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Esse relatório de fornecedores listar contempla todos os fornecedores já cadastrado no sistema, seja ele ativo ou não.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                



                <br/><br/><br/>
 
            </div>
        </>
    )
}

export default verificarAutenticidade(Ajuda);