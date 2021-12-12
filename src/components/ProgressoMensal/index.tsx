
import { useState } from 'react';
import Chart from 'react-apexcharts';

export default function ProgressoMensal(){

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
        name: 'Vendas',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 33, 80, 66, 125]
    }])

    return (
        <>
            <Chart options={options} series={series} type="bar" height={300} />
        </>
    )
}