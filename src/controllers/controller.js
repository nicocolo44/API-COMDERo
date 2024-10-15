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

    getDataMicro: (req, res) => {
        try {
            const data = dataService.getData();
            const microData = {
                hora: data.hora,
                gramos: data.gramos,
                modificado: data.modificado,
                darComida: data.darComida
            };
            const { plateWeight, bucketWeight } = req.body;
            if (plateWeight && bucketWeight) {
                dataService.updateDataFromMicro(plateWeight, bucketWeight);
            }
            res.json(microData);
            dataService.reset();
        } catch (error) {
            res.status(500).json({ error: 'Error al procesar los datos del microcontrolador' });
        }
    },

    updateData: (req, res) => {
        try {
            const { hora, gramos } = req.body;
            if (!hora || !gramos) {
                return res.status(400).json({ error: 'Se requieren hora y gramos' });
            }
            const updatedData = dataService.updateDataFromUser(hora, gramos);
            res.json(updatedData);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar los datos' });
        }
    },

    darComida: (req, res) => {
        try {
            const data = dataService.getData();
            data.darComida = true;
            dataService.setDarComida();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error al dar comida' });
        }
    }

};

module.exports = controller;