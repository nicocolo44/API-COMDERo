const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe o está vacío, devuelve un objeto con la estructura deseada
        return { hora: '', gramos: 0, modificado: false };
    }
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

const updateData = (hora, gramos) => {
    const data = readData();
    data.hora = hora;
    data.gramos = gramos;
    data.modificado = true;
    writeData(data);
    return data;
}

const getData = () => {
    return readData();
}

const resetModificado = () => {
    const data = readData();
    data.modificado = false;
    writeData(data);
    return data;
}

const clearData = () => {
    const emptyData = { hora: '', gramos: 0, modificado: false };
    writeData(emptyData);
    return emptyData;
}

const createData = (hora, gramos) => {
    return updateData(hora, gramos);
}

module.exports = {
    getData,
    updateData,
    createData,
    resetModificado,
    clearData
};