const express = require('express');
const {Propery, validateProperty} = require('../models/property');
const router = express.Router();
const mongoose = require('mongoose');
const auth =  require('../middleware/auth');



router.post('/',  async (req, res) => {

    const { error } = validateProperty(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let property = Propery({
        name: req.body.name,
        location: req.body.location,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    });

    await property.save();
    res.send(property);

});

router.get('/:id', async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Property with the given ID does not exist');

    const property = await Propery.findById(req.params.id);
    if (!property) return res.status(404).send("Property with the given ID does not exist");
    res.send(property);
});

router.get('/', async (req, res) => {
    const properties = await Propery
        .find()
        .sort('name');

    res.send(properties);
});

router.delete('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Property with the given ID does not exist');

    const property = await Propery.findByIdAndRemove(req.params.id);

    if (!property) return res.status(404).send('Property with the given ID does not exist.');
});

module.exports = router;