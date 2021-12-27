import { useEffect, useState } from "react";
import { WiThermometerExterior } from 'react-icons/wi';

export default function Temperatura(){

    const [temp, setTemp] = useState('');

    useEffect(() => {
        getUserPosition();
    }, [])

    async function getUserPosition() {
    
        let url = null;
        navigator.geolocation.getCurrentPosition((pos) => {
          let lat = pos.coords.latitude;
          let long = pos.coords.longitude;
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=95b11822eb429c84c1143a19251b1881`;
          fetchApi(url);
        });

    }

    async function fetchApi(url: string) {

        fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1);
          setTemp(`+ ${tempInCelsius}°C Temperatura`);
        })
        .catch((err) => {
          console.log("Error: " + err);
        })

    }

    return (
        <>
            <h3><WiThermometerExterior /> </h3>  
            <h4> {temp}</h4> 
        </>
    )
    
}