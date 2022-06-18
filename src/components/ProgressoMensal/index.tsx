
import { useState } from 'react';
import Chart from 'react-apexcharts';

export default function ProgressoMensal(props: any): JSX.Element{

    const [options, setOptions] = useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        }/*,
        fill: {
            colors: ['#E91E63', '#F44336', '#9C27B0']
        }*/
    })

    const [series, setSeries] = useState([{
        name: props.nome,
        data: props.vendasfechamentos
    }])

    const Charts = Chart as any; // TS has an issue with the return type

    return (
        <>{
            <Charts options={options} series={series} type={props.tipo} height={300} />
        }</>
    )
}