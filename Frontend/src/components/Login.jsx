import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  const handleLogin = async () => {
    try {
      // Realizar una solicitud al servidor Node.js para verificar la autenticación
      const response = await axios.post('http://localhost:3000/login', { username, password });

      // Verificar si la autenticación fue exitosa
      if (response.data.success) {
        // Limpiar cualquier mensaje de error anterior
        setError('');
        
        // Redirigir a la página de "misAcciones"
        navigate('/misAcciones');
      } else {
        // Mostrar mensaje de error
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al realizar la autenticación', error);
      // Mostrar mensaje de error
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Usuario:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Clave:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Iniciar sesión</button>

      {/* Mostrar mensaje de error en la UI */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
