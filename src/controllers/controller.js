const dataService = require('../services/service');

const controller = {
    getDataUser: (req, res) => {
        try {
            const data = dataService.getData();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los datos' });
        }
    },

    getDataMicro:  (req, res) => {
        try {
            const data = dataService.getData();
            res.json(data);
            dataService.resetModificado();
        } catch (error) {
            res.status(500);
        }
    },

    updateData: (req, res) => {
        try {
            const { hora, gramos } = req.body;
            if (!hora || !gramos) {
                return res.status(400).json({ error: 'Se requieren hora y gramos' });
            }
            const updatedData = dataService.updateData(hora, gramos);
            res.json(updatedData);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar los datos' });
        }
    },

};

module.exports = controller;