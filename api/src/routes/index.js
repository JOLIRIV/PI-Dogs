const { Router } = require('express');
const { Temperament } = require('../db');
const { MY_API_KEY } = process.env;
const express = require('express');
const axios = require('axios');

// Importar todos los routers;
const dogRouter = require('./dog');
const dogsRouter = require('./dogs');
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use('/dogs', dogsRouter);
router.use('/dog', dogRouter);
// Ejemplo: router.use('/auth', authRouter);

//--endpoints--//

router.get("/temperament", async (req, res) => {
    try{
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");//convierte el array con todos los temperamentos de perros de la api, en un string separado por comas. A continuación, con split separa todos los temperamentos del array.
    temps.forEach(el => {
        let i = el.trim()//elimina los espacios en blanco al principio y al final de cada temperamento
        Temperament.findOrCreate({
             where: { name: i }//si el name no está lo crea en el modelo Temperament
        })
    })

    const allTemp = await Temperament.findAll();//busco todos los temperamentos de la BD y los almaceno en la variable alltemp    
    res.send(allTemp);}
    catch (error) {
        res.status(400).json({ error: error.message });
      }
});

router.use(express.json());

module.exports = router;
