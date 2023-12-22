import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; 

const DetalleDeAccion = () => {
  const [symbolData, setSymbolData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedParameter, setSelectedParameter] = useState('historico');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [interval, setIntervalValue] = useState('1min');
  const [showChart, setShowChart] = useState(false);
  const { symbol,name,currency } = useParams();

  const fetchData = async () => {
    try {
      if (!symbol || !showChart) {
        return;
      }

      let apiUrl = '';
      const apiKey = 'd4c1447c67104854bb7488d8dd25ce07';

      if (selectedParameter === 'historico') {
        apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

        if (startDate) {
          apiUrl += `&start_date=${startDate}`;
        }

        if (endDate) {
          apiUrl += `&end_date=${endDate}`;
        }
      } else {
        apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
      }

      const response = await axios.get(apiUrl);

      const symbolName = response.data && response.data.meta ? response.data.meta.symbol : '';
      const values = Array.isArray(response.data.values) ? response.data.values : [];

      const options = {
        title: {
          text: `Cotización de la Acción - ${symbol}`,
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Intervalo',
          },
        },
        yAxis: {
          title: {
            text: 'Cotización',
          },
        },
        series: [
          {
            name: symbol,
            data: values.map((value) => [
              new Date(value.datetime).getTime(),
              parseFloat(value.close),
            ]),
          },
        ],
      };

      setSymbolData(values);
      setChartOptions(options);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, interval === '1min' ? 60000 : interval === '5min' ? 300000 : 900000);

    return () => clearInterval(intervalId);
  }, [selectedParameter, startDate, endDate, interval, symbol, showChart]);

  const handleParameterChange = (parameter) => {
    setSelectedParameter(parameter);
  };

  const handleGraficarClick = () => {
    setShowChart(true);
  };

  return (
    <div>
      <Navbar symbol={symbol} name={name} currency={currency}/>
      <div>
        <label>Parámetro:</label>
        <select onChange={(e) => handleParameterChange(e.target.value)}>
          <option value="historico">Histórico</option>
          <option value="tiempoReal">Tiempo Real</option>
        </select>
      </div>
      {selectedParameter === 'historico' && (
        <div>
          <label>Fecha de inicio:</label>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          <label>Fecha de fin:</label>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </div>
      )}
      <div>
        <label>Intervalo:</label>
        <select onChange={(e) => setIntervalValue(e.target.value)}>
          <option value="1min">1 minuto</option>
          <option value="5min">5 minutos</option>
          <option value="15min">15 minutos</option>
        </select>
      </div>
      <div>
        <button onClick={handleGraficarClick}>Graficar</button>
      </div>
      {showChart && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
    </div>
  );
};

export default DetalleDeAccion;
