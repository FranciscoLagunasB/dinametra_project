import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './WeatherChart.scss';

function WeatherChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Función para destruir el gráfico anterior
    const destroyChart = () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };

    if (data && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Extraer las fechas y los datos para las gráficas
      const dates = data.map(entry => entry.dateTime);
      const temperatures = data.map(entry => entry.temperature);
      const humidity = data.map(entry => entry.humidity);

      // Destruir el gráfico anterior antes de renderizar uno nuevo
      destroyChart();

      // Crear el nuevo gráfico
      const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates.map(date => new Date(date).toLocaleString()),
          datasets: [{
            label: 'Temperature (°C)',
            data: temperatures,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          }, {
            label: 'Humidity (%)',
            data: humidity,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true // Hacer el gráfico responsive
        }
      });

      // Guardar la instancia del gráfico en la referencia del lienzo
      chartRef.current.chart = barChart;
    } else {
      // Si no hay datos, destruir el gráfico anterior
      destroyChart();
    }

    // Devolver la función de limpieza para destruir el gráfico al desmontar el componente
    return () => {
      destroyChart();
    };
  }, [data]);

  return (
    <div className="chart-container mt-4">
      <div className="chart-header">
        <h2 className="chart-title">Gráfico de Clima</h2>
        <p className="chart-description">Este gráfico muestra la temperatura y la humedad en diferentes momentos.</p>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default WeatherChart;
