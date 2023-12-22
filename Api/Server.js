const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint para verificar la autenticación
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Usuario:', username);
  console.log('Password:', password);

  // Verificar el nombre de usuario y contraseña
  if (username === 'usuarioEjemplo' && password === 'contraseñaEspecifica') {
    const userInfo = {
      username: 'usuarioEjemplo',
      role: 'admin',
      
    };

    res.json({ success: true, message: 'Autenticación exitosa', user: userInfo });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

console.log('Iniciando el servidor...');
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
