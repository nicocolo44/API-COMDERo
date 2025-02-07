const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Ruta para obtener datos (usuario)
router.get('/data/user', controller.getDataUser);

// Ruta para obtener datos (micro)
router.put('/micro', controller.getDataMicro);

// Ruta para actualizar datos
router.put('/data', controller.updateData);

// Ruta para dar comida
router.put('/darComida', controller.darComida);

// Ruta para actualizar gramos (micro)
router.put('/gramos', controller.actualizarGramosDesdeMicro);

// Ruta para actualizar hora (micro)
router.put('/hora', controller.actualizarHoraDesdeMicro);

module.exports = router;