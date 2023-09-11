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
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);}
    catch (error) {
        res.status(400).json({ error: error.message });
      }
});

router.use(express.json());

module.exports = router;
