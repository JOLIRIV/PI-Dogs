const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const express = require('express');

const router = Router();

//--endpoints--//
router.post("/", async (req, res) => {
    let {
     name,
     min_height,
     max_height,
     min_weight,
     max_weight,
     life_span,
     temperaments,
     image
    } = req.body
    try{
    const fixedHeight = []
    const minHeight = min_height;
    const maxHeight = max_height;
    fixedHeight.push(minHeight, maxHeight)
 
    const fixedWeight = []
    const minWeight = min_weight;
    const maxWeight = max_weight;
    fixedWeight.push(minWeight, maxWeight)
 
    let dog = await Dog.create({
     name,
     height: fixedHeight,
     weight: fixedWeight,
     life_span,
     image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    })
 
    let associatedTemp = await Temperament.findAll({
        where: { name: temperaments},
    })
 
    dog.addTemperament(associatedTemp);
 
    res.status(200).send("Dog created succesfully!")}
    catch (error) {
        res.status(400).json({ error: error.message });
      }});

router.use(express.json());

module.exports = router;