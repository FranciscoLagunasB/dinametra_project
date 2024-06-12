import React, { useState } from 'react'
import Form from '../Form/Form';
import Card from '../Card/Card';
import Table from '../../Table/Table'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WheaterPanel() {
    let API_KEY = "2e68ff51b674075e00dd24bf4d7a0a1b"
    
    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [weatherHistory, setWeatherHistory] = useState([]);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) => {

        let city_NAME= `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=${API_KEY}`
        
        let location_res;
        let latResult = ""
        let lonResult = ""
        await fetch(city_NAME)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((res) => {
                location_res = res;

                const { lat, lon } = location_res[0];
                 // Asignar valores a las variables fuera de la cadena de promesas
                latResult = lat;
                lonResult = lon;
            })
            .catch(error => {
                setLoading(false);
                setShow(false);
            });


            if (!latResult || !lonResult) {
                toast.error("No se ha encontrado la ubicación de la ciudad solicitada");
                setWeatherHistory([]);
                setLoading(false);
                setShow(false);
                return;
            }

        setLoading(true);
        setLocation(loc);

        //weather
        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latResult}&lon=${lonResult}&appid=${API_KEY}`;

        await fetch(urlWeather).then((response) =>{
            if(!response.ok) throw new Error(response.statusText);
            return response.json();
        }).then((weatherData) =>{
            setWeather(weatherData);
        }).catch(error =>{
            setLoading(false);
            setShow(false);
        });

        //Forecast
        let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latResult}&lon=${lonResult}&appid=${API_KEY}&lang=es`

        await fetch(urlForecast).then((response) =>{
            if(!response.ok) throw new Error(response.statusText);
            return response.json();
        }).then((forecastData) =>{
            setForecast(forecastData);


            setLoading(false);
            setShow(true);
        }).catch(error =>{
            setLoading(false);
            setShow(false);
        });

        // Creamos una fecha para hoy
        let wheater_history = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${API_KEY}`
        

        await fetch(wheater_history).then((response) =>{
            if(!response.ok) throw new Error(response.statusText);
            return response.json();
        }).then((weatherHistory) =>{

            let data = weatherHistory.list.map(item => (
                {
                    dateTime: item.dt_txt,
                    weather: item.weather[0].description,
                    temperature: item.main.temp,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed,
                    windDirection: item.wind.deg
                }
            ));

            setWeatherHistory(data);
            setLoading(false);
            setShow(true);
        }).catch(error =>{
            setLoading(false);
            setShow(false);
        });
    }


    return(

        <React.Fragment>
    
            <Form
                newLocation = {getLocation}
            />

            <Card
                showData = {show}
                loadingData = {loading}
                weather = {weather}
                forecast = {forecast}
            />
            <Table 
                showData = {show}
                loadingData = {loading}
                location = {location}
                weatherHistory = {weatherHistory} />

            <ToastContainer 
                position="bottom-center"
                bodyClassName="toast-body"/>
        </React.Fragment>

    );
}  

export default WheaterPanel