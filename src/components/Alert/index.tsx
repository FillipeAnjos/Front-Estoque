import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const estilo = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ActionAlerts(props: any) {
    const est = estilo();
    
    function trocarEstadoAlerta(){
        props.alterarEstadoDoAlertaDoPai();
    }

    // Tipos de Alert's //https://v4.mui.com/pt/components/alert/
    //https://gist.github.com/matheusrod92/b01b2d48c2a5729e3186fe210f54c573

    /*
        ----- Como chamar o Alert? -----
        <ActionAlerts 
            estado={alerta} 
            alterarEstadoDoAlertaDoPai={estadoAlerta} 
            tipo={'warning'}
            mensagem={'Essa é uma mensagem de teste!'}
        />  

     
        ----- Tipos de alertas -----
        tipo={error}
        tipo={warning}
        tipo={info}
        tipo={success}
    */

  return (
    <div className={est.root}>
        <br/>
        {props.estado == true ? <Alert severity={props.tipo} onClose={() => trocarEstadoAlerta() }>{props.mensagem}</Alert> : ''}
    </div>
  );
}