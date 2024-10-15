const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Ruta para obtener datos (usuario)
router.get('/data/user', controller.getDataUser);

// Ruta para obtener datos (micro)
router.get('/data/micro', controller.getDataMicro);

// Ruta para actualizar datos
router.put('/data', controller.updateData);

module.exports = router;