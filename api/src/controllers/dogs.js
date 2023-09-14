const { Dog, Temperament } = require('../db');
const axios = require('axios');//biblioteca que se utiliza para hacer solicitudes a un endpoint (API o servidor backend) que convierte los datos a JSON en forma automática (a diferencia de fetch) puede utilizarse con async await y con promesas
const { MY_API_KEY } = process.env;

let urLink = `https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`

const getApiData = async() => {
    
    const apiData = await axios.get(urLink);//JSON
    const apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = el.temperament.split(", ");//separa el string por comas y con espacio
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");//imperial y metric son distintos sistemas de medición
    }

    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
return apiInfo;
}

//-- Get data from the database posgrest--//
const getFromDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo, parece que no es necesario.
            },
        }
    })
};

//combine data from API and database
const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    // const allDataMixed = dataFromApi.concat(dataFromDb);
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
}

module.exports = {
    getAllDogs,    
}