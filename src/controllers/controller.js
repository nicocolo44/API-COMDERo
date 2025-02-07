const dataService = require('../services/service');

const controller = {
    getDataUser: (req, res) => {
        try {
            const data = dataService.getData();
            console.log("Data obtenida por el usuario: ", data)
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los datos' });
        }
    },

    getDataMicro: (req, res) => {
        try {
            console.log("Empieza getDataMicro con parametros ", req.body)
            const data = dataService.getData();
            const microData = {
                hora: data.hora,
                gramos: data.gramos,
                modificado: data.modificado,
                darComida: data.darComida
            };
            let aux;
            const { plateWeight, bucketWeight } = req.body;
            if (plateWeight && bucketWeight) {
                if(plateWeight > 10000 || bucketWeight > 10000) {
                    console.log("Error en data desde micro: ", plateWeight, bucketWeight)
                    return res.status(400).json({ error: 'El valor de peso debe ser menor a 256' });
                }
                aux = dataService.updateDataFromMicro(plateWeight, bucketWeight);
            }
            console.log("Retorno de Data Micro: ", microData)
            aux = dataService.reset();
            res.json(microData);
            
        } catch (error) {
            res.status(500).json({ error: 'Error al procesar los datos del microcontrolador' });
        }
    },

    updateData: (req, res) => {
        try {
            console.log("Empieza updateData con parametros ", req.body)
            const { hora, gramos } = req.body;
            if (!hora || !gramos) {
                return res.status(400).json({ error: 'Se requieren hora y gramos' });
            }
            if (gramos > 256) {
                return res.status(400).json({ error: 'El valor de gramos debe ser menor a 256' });
            }
            const updatedData = dataService.updateDataFromUser(hora, gramos);
            console.log("Data actualizada: ", updatedData)
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
            console.log("Dar comida: ", data)
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error al dar comida' });
        }
    },

    actualizarHoraDesdeMicro: (req, res) => {
        try {
            console.log("Empieza actualizarHoraDesdeMicro con parametros ", req.body)
            const { hora } = req.body;
            if (!hora) {
                return res.status(400).json({ error: 'Se requiere la hora' });
            }
            const updatedData = dataService.updateHoraFromMicro(hora);
            console.log("Data actualizada: ", updatedData)
            res.json(updatedData);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar los datos' });
        }
    },

    actualizarGramosDesdeMicro: (req, res) => {
        try {
            console.log("Empieza actualizarGramosDesdeMicro con parametros ", req.body)
            const { gramos } = req.body;
            if (!gramos) {
                return res.status(400).json({ error: 'Se requieren los gramos' });
            }
            if (gramos > 256) {
                return res.status(400).json({ error: 'El valor de gramos debe ser menor a 256' });
            }
            const updatedData = dataService.updateGramosFromMicro(gramos);
            console.log("Data actualizada: ", updatedData)
            res.json(updatedData);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar los datos' });
        }
    }

};

module.exports = controller;