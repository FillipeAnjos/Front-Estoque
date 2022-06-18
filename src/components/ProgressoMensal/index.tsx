
import { useState } from 'react';
import Chart from 'react-apexcharts';

export default function ProgressoMensal(props: any){

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

    return (
        <>
            <div className="app">
                <div className="row">
                <div className="mixed-chart"></div>
                    <Chart options={options} series={series} type={props.tipo} height={300} />
                </div>
            </div>
        </>
    )
}