const express = require('express');
const {Customer, validateCustomer} = require('../models/customer');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);

    if (error) return res.status(404).send(error.details[0].message);
    let customer = await Customer.findOne({email: req.body.email});
    if (customer) return res.status(400).send('Customer already registered.')

    customer = new Customer(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    

    await customer.save(customer);
    const token = jwt.sign({ _id: customer._id}, config.get('jwtPrivateKey'));

    res.send(token);});

router.get('/', async (req, res) => {
    const customers = await Customer
        .find({})
        .sort({firstName: 1});
    
    res.send(customers);
})

module.exports = router;