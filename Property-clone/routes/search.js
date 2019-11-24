

const express = require('express');
const {Propery, validateProperty} = require('../models/property');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/:value', async (req, res) => {
    if (!isNaN(req.params.agent)) return res.status(400).send('Property with the given Agent is not available');

    

    const property = await Propery.find({$text: {$search: req.params.value}});

    if (!property) return res.status(404).send("Property with the given Agent is not available");
    res.send(property);
});

module.exports = router;