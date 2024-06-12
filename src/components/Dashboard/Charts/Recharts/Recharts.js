import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Recharts({ data }) {
  return (
    <div className="chart-container mt-4">
      <div className="chart-header">
        <h2 className="chart-title">Gráfico de Clima</h2>
        <p className="chart-description">Este gráfico muestra la temperatura y la humedad en diferentes momentos.</p>
      </div>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateTime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default Recharts;


// https://github.com/plouc/nivo/issues/2415