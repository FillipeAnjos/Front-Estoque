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
                    <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            

                <Accordion>
                    <AccordionSummary
                    expandIcon={<AiFillCaretDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Accordion 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
 
            </div>
        </>
    )
}

export default verificarAutenticidade(Ajuda);