const { Router } = require('express');
const express = require('express');
const { getAllDogs} = require('../controllers/dogs');

const router = Router();


router.get("/", async(req, res) => {//esta funcion también puede recibir un nombre por medio de query
    // const name = req.query.name;
    const { name } = req.query;
    try{
    const allDogs = await getAllDogs();
    if (name) {//toLowerCase convierte el string a minúscula para poder hacer la búsqueda con cualquier tipo de letra que se ingrese.
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found"); //este es un filtro del back.
    } else {
        res.status(200).send(allDogs);
    }}catch (error) {
        res.status(400).json({ error: error.message });
}});

router.get("/:idRaza", async(req, res) => {//traer la info de un perro por su id, del modelo raza, se usa para el dogdetails
    try{
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("Dog no found in the Data");
    }}catch (error) {
        res.status(400).json({ error: error.message });
}});


router.use(express.json());

module.exports = router;