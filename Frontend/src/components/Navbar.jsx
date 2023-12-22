import React from 'react';
import './Navbar.css'; 

const Navbar = ({ username, symbol, name, currency }) => {
  return (
    <div className="navbar">
      <div className="left">
        {symbol && (
          <div>
            <span>{symbol}</span>
            {name && currency && <span> - {name} - {currency}</span>}
          </div>
        )}
        {!symbol && <h1>Mis Acciones</h1>}
      </div>
      <div className="right">
        {username && <span>Bienvenido, {username}</span>}
        {/* Agregar un botón de cierre de sesión u otras opciones aquí */}
      </div>
    </div>
  );
};

export default Navbar;

