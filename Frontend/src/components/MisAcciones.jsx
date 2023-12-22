import React from 'react';
import Navbar from './Navbar'; 
import StockSearch from './StockSearch';

const MisAcciones = () => {
    
    const username = "UsuarioEjemplo";

    return (
        <div>
            <Navbar title="Mis Acciones" username={username} />
            <div>
                <StockSearch />
            </div>
        </div>
    );
};

export default MisAcciones;