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

const updateDataFromUser = (hora, gramos, isFromMicro = false) => {
    const data = readData();
    data.hora = hora;
    data.gramos = gramos;
    if(!isFromMicro){
        data.modificado = true;
    }  
    writeData(data);
    return data;
}

const updateDataFromMicro = (platerWeight, bucketWeight) => {
    const data = readData();
    data.plateWeight = platerWeight;
    data.bucketWeight = bucketWeight;
    writeData(data);
    return data;
}

const getData = () => {
    return readData();
}

const reset = () => {
    const data = readData();
    data.modificado = false;
    data.darComida = false;
    writeData(data);
    return data;
}

const clearData = () => {
    const emptyData = { hora: '', gramos: 0, modificado: false, platerWeight: '', bucketWeight: '' };
    writeData(emptyData);
    return emptyData;
}

const createData = (hora, gramos) => {
    return updateDataFromUser(hora, gramos);
}

const setDarComida = () => {
    const data = readData();
    data.darComida = true;
    writeData(data);
    return data;
}

const updateGramosFromMicro = (gramos) => {
    const data = readData();
    data.gramos = gramos;
    writeData(data);
    return data;
}

const updateHoraFromMicro = (hora) => {
    const data = readData();
    data.hora = hora;
    writeData(data);
    return data;
}

module.exports = {
    getData,
    updateDataFromUser,
    updateDataFromMicro,
    createData,
    reset,
    clearData,
    setDarComida,
    updateGramosFromMicro,
    updateHoraFromMicro
};