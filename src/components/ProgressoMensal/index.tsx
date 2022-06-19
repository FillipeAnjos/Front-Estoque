
import { useState } from 'react';
import dynamic from 'next/dynamic'
//import Chart from 'react-apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });// Essa linha resolver o erro de "ReferenceError: window is not defined" - https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined

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

    const Charts = Chart as any; // Gambiarra feita para resolver o erro da Vercel, retorno de um elemento JSX

    return (
        <>{
            <Charts options={options} series={series} type={props.tipo} height={300} />
        }</>
    )
}