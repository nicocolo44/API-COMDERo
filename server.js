const express = require('express');
const app = express();
const port = 5000;
const routes = require('./src/routes/routes');
const cors = require('cors');
// Middleware para parsear JSON

app.use(express.json());
app.use(cors());
app.use('/api', routes);

// Ruta básica de prueba
app.get('/', (req, res) => {
   res.send('Hello World!');
});

// Levantar el servidor
app.listen(port, () => {
   console.log(`API escuchando en http://localhost:${port}`);
});