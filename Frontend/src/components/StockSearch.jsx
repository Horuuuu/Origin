import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StockSearch = () => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [addedSymbols, setAddedSymbols] = useState([]);
  const apiKey = 'd4c1447c67104854bb7488d8dd25ce07';

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/stocks?source=docs&exchange=NYSE&apikey=${apiKey}`
        );

        setSearchResults(response.data.data || []);
      } catch (error) {
        console.error('Error al obtener acciones:', error);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    try {
      const storedSymbols = localStorage.getItem('addedSymbols');
      console.log('storedSymbols from localStorage:', storedSymbols);
  
      if (storedSymbols) {
        const parsedSymbols = JSON.parse(storedSymbols);
        console.log('parsedSymbols from localStorage:', parsedSymbols);
  
        setAddedSymbols(parsedSymbols);
      }
    } catch (error) {
      console.error('Error al cargar desde localStorage:', error);
    }
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem('addedSymbols', JSON.stringify(addedSymbols));
      console.log('addedSymbols saved to localStorage:', addedSymbols);
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [addedSymbols]);
  

  const handleSearchChange = (event) => {
    const symbol = event.target.value.toUpperCase();
    setSearchSymbol(symbol);
  };

  const handleAddSymbol = async () => {
    if (searchSymbol.trim() !== '' && !addedSymbols.some((symbolObj) => symbolObj.symbol === searchSymbol)) {
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/quote?symbol=${searchSymbol}&apikey=${apiKey}`
        );

        const { name, currency } = response.data;
        setAddedSymbols((prevSymbols) => [...prevSymbols, { symbol: searchSymbol, name, currency }]);
        setSearchSymbol('');
        console.log('Símbolo agregado:', searchSymbol);
      } catch (error) {
        console.error('Error al obtener información de la acción:', error);
      }
    }
  };

  const handleRemoveSymbol = (symbolToRemove) => {
    setAddedSymbols((prevSymbols) => prevSymbols.filter((symbolObj) => symbolObj.symbol !== symbolToRemove));
    console.log('Símbolo eliminado:', symbolToRemove);
  };

  return (
    <div className="stock-search">
      <div className="symbol-input">
        <label>Símbolo:</label>
        <input
          type="text"
          value={searchSymbol}
          onChange={handleSearchChange}
          placeholder="Escribe el símbolo"
        />
        <button onClick={handleAddSymbol}>Agregar Símbolo</button>
      </div>
      {searchSymbol && (
        <div className="search-results">
          <ul>
            {searchResults
              .filter((result) => result.symbol.toLowerCase().includes(searchSymbol.toLowerCase()))
              .map((result) => (
                <li key={result.symbol}>{result.symbol}</li>
              ))}
          </ul>
        </div>
      )}
     <div className="added-symbols">
  {/*<h3>Símbolos Agregados:</h3>*/}
  <table>
    <thead>
      <tr>
        <th>Símbolo</th>
        <th>Nombre</th>
        <th>Moneda</th>
        <th>Eliminar</th>
      </tr>
    </thead>
    <tbody>
      {addedSymbols.map((symbolObj) => (
        <tr key={symbolObj.symbol}>
          <td>
            <Link to={`/detalleDeAccion/${symbolObj.symbol}`}>{symbolObj.symbol}</Link>
          </td>
          <td>{symbolObj.name}</td>
          <td>{symbolObj.currency}</td>
          <td>
            <button onClick={() => handleRemoveSymbol(symbolObj.symbol)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default StockSearch;