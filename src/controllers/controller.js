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
            const { plateWeight, bucketWeight, hora, gramos} = req.body;
            if (plateWeight && bucketWeight) {
                if(plateWeight > 10000 || bucketWeight > 10000) {
                    return res.status(400).json({ error: 'El valor de peso debe ser menor a 256' });
                }
                aux = dataService.updateDataFromMicro(plateWeight, bucketWeight);
            }
            if(hora && gramos) {
                if (gramos > 256) {
                    return res.status(400).json({ error: 'El valor de gramos debe ser menor a 256' });
                }
                console.log("Actualizando data desde micro: ", hora, gramos)
                dataService.updateDataFromUser(hora, gramos, true);
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
    }

};

module.exports = controller;