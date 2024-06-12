import React from 'react'
import './Card.scss'
import Spinner from '../../Spinner/Spinner'
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
  } from "mdb-react-ui-kit";

function Card({loadingData, showData, weather, forecast}) {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var date = day + '/' + month + '/' + year;

    var url = "";
    var iconUrl = "";

    var iconUrl3 = "";
    var iconUrl6 = "";
    var iconUrl9 = "";

    var forecastDate3 = "";
    var forecastDate6 = "";
    var forecastDate9 = "";

    if(loadingData){
        return  <Spinner />;
    }

    if(showData){
        url = "https://openweathermap.org/img/w/";
        iconUrl = url + weather.weather[0].icon + ".png";
        
        iconUrl3 = url + forecast.list[1].weather[0].icon + ".png";
        iconUrl6 = url + forecast.list[2].weather[0].icon + ".png";
        iconUrl9 = url + forecast.list[3].weather[0].icon + ".png";

        forecastDate3 = forecast.list[1].dt_txt.substring(8, 10) + '/' + forecast.list[1].dt_txt.substring(5, 7) + '/' + forecast.list[1].dt_txt.substring(0, 4) + ' ' +  forecast.list[1].dt_txt.substring(11, 13);
        forecastDate6 = forecast.list[2].dt_txt.substring(8, 10) + '/' + forecast.list[2].dt_txt.substring(5, 7) + '/' + forecast.list[2].dt_txt.substring(0, 4) + ' ' +  forecast.list[2].dt_txt.substring(11, 13);
        forecastDate9 = forecast.list[3].dt_txt.substring(8, 10) + '/' + forecast.list[3].dt_txt.substring(5, 7) + '/' + forecast.list[3].dt_txt.substring(0, 4) + ' ' +  forecast.list[3].dt_txt.substring(11, 13);
    }

    return (
        <div className="mt-5">
            {
                showData === true ? (
                    <section>
                        <div className="text-left mb-4">
                            <p style={{ fontSize: "1.1rem", color: "#333", marginLeft: "10px"}}>
                                A continuación, encontrarás un resumen detallado del clima para la ciudad seleccionada:
                            </p>
                        </div>
                        <MDBContainer fluid>
                            <MDBRow className="justify-content-center align-items-center">
                                {/* Contenedor 1 */}
                                <MDBCol lg="12" className="mb-4">
                                    <MDBCard className="mb-4 gradient-custom" style={{ borderRadius: "25px" }}>
                                    <MDBCardBody className="p-4">
                                        <div className="d-flex flex-column flex-md-row justify-content-center pb-2"> {/* Utiliza flex-column en dispositivos móviles y flex-md-row en tamaños de pantalla más grandes */}
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "20px", marginRight: "0" }}> {/* Añadido marginBottom para separar los elementos en dispositivos móviles */}
                                                <h2 className="display-2">
                                                    <strong>{(weather.main.temp - 273.15).toFixed(1)}ºC</strong>
                                                </h2>
                                                <p className="text-muted mb-0">{weather.name}</p>
                                                <p className="text-muted mb-0">{date}</p>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <img src={iconUrl} alt="icon" width="150px"/>
                                                <p className="card-desc">{weather.weather[0].description}</p>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                {/* Contenedor 2 */}
                                <MDBCol lg="6" className="mb-4">
                                    <MDBCard className="mb-4 gradient-custom" style={{ borderRadius: "25px", minHeight: "200px" }}>
                                        <MDBCardBody className="p-4">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <div>
                                                    <p className="text-muted mb-0"><strong>Temperatura máxima: </strong>{(weather.main.temp_max - 273.15).toFixed(1)}ºC</p>
                                                    <p className="text-muted mb-0"><strong>Temperatura mínima: </strong>{(weather.main.temp_min - 273.15).toFixed(1)}ºC</p>
                                                    <p className="text-muted mb-0"><strong>Sensación térmica: </strong>{(weather.main.feels_like- 273.15).toFixed(1)}ºC</p>
                                                    <p className="text-muted mb-0"><strong>Humedad: </strong>{weather.main.humidity}%</p>
                                                    <p className="text-muted mb-0"><strong>Velocidad del viento: </strong>{weather.wind.speed}m/s</p>
                                                </div>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                {/* Contenedor 3 */}
                                <MDBCol lg="6" className="mb-4">
                                    <MDBCard className="mb-4 gradient-custom" style={{ borderRadius: "25px", minHeight: "200px" }}>
                                        <MDBCardBody className="p-4" style={{ overflowX: "auto" }}>
                                        <div className="d-flex justify-content-between">
                                    <div className="flex-column" style={{ marginRight: "10px", marginBottom: "10px" }}>
                                        <p className="small">
                                            <strong>{forecastDate3}h</strong>
                                        </p>
                                        <img src={iconUrl3} alt="icon" style={{ color: "#ddd" }} className='mb-3'/>
                                        <p className="mb-0">
                                            <strong>{forecast.list[1].weather[0].description}</strong>
                                        </p>
                                        <p className="mb-0 text-muted" style={{ fontSize: ".65rem" }}>
                                            {(forecast.list[1].main.temp - 273.15).toFixed(1)}ºC
                                        </p>
                                    </div>
                                    <div className="flex-column" style={{ marginRight: "10px", marginBottom: "10px" }}>
                                        <p className="small">
                                            <strong>{forecastDate6}h</strong>
                                        </p>
                                        <img src={iconUrl6} alt="icon" style={{ color: "#ddd" }} className='mb-3'/>
                                        <p className="mb-0">
                                            <strong>{forecast.list[2].weather[0].description}</strong>
                                        </p>
                                        <p className="mb-0 text-muted" style={{ fontSize: ".65rem" }}>
                                            {(forecast.list[2].main.temp - 273.15).toFixed(1)}ºC
                                        </p>
                                    </div>
                                    <div className="flex-column">
                                        <p className="small">
                                            <strong>{forecastDate9}h</strong>
                                        </p>
                                        <img src={iconUrl9} alt="icon" style={{ color: "#ddd" }} className='mb-3'/>
                                        <p className="mb-0">
                                            <strong>{forecast.list[3].weather[0].description}</strong>
                                        </p>
                                        <p className="mb-0 text-muted" style={{ fontSize: ".65rem" }}>
                                            {(forecast.list[3].main.temp - 273.15).toFixed(1)}ºC
                                        </p>
                                    </div>
                                    </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>


                ):(
                    <div className="text-center mb-4">
                        <p style={{ fontSize: "1rem", color: "#666" }}>Aquí aparecerá tu búsqueda</p>
                    </div>
                )
            }
        </div>
    );
}

export default Card