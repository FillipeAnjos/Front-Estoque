import Head from "next/head";
import styles from "../components/Venda/styles.module.scss";
import { AiFillCaretDown } from 'react-icons/ai';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

export default function VendaOff(){

    return (
        <>
            <Head>
                <title>Venda</title>
            </Head>
            <div className={styles.container}>
                <h2>Venda - Off</h2>
                <hr />

                <br/><br/>

                <p>
                    Se você estiver vendo essa tela é por que você não pode acessar a tela de vendas.
                    <br/>
                    Veja abaixo os principais motivos!
                </p>

                <br/>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<AiFillCaretDown />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Principal Motivo</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <li>Muito provável que o seu <i>caixa esteja fechado.</i><br/></li>
                        <li>Verifique na página <b>Home</b> se você está com o caixa aberto.<br/></li>
                        <li>Botão verde no canto superior direito.</li>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            

                <Accordion>
                    <AccordionSummary
                        expandIcon={<AiFillCaretDown />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                    <Typography>Modivo Secundário</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <li>Caso esteja com o caixa aberto e mesmo assim não esteja aparecendo a tela de <b>Vendas</b>, saia e entre no sistema novamente.<br/></li>
                        <li>Caso não tenha funcionado, favor entrar em contato com o administrador do sistema.</li>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
 
            </div>
        </>
    )
}