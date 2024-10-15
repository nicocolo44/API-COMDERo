const express = require('express');
const app = express();
const port = 3000;
const routes = require('./src/routes/routes');

// Middleware para parsear JSON
app.use(express.json());
app.use('/api', routes);
// Ruta básica de prueba
app.get('/', (req, res) => {
   res.send('Hello World!');
});

// Levantar el servidor
app.listen(port, () => {
   console.log(`API escuchando en http://localhost:${port}`);
});