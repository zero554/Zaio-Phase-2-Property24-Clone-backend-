const express = require('express');
const {Customer, validateCustomer} = require('../models/customer');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);

    if (error) return res.status(404).send(error.details[0].message);
    let customer = await Customer.findOne({email: req.body.email});
    if (customer) return res.status(400).send('Customer already registered.')

    customer = new Customer(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);

    await customer.save(customer);
    const token = jwt.sign({ _id: customer._id}, config.get('jwtPrivateKey'));

    res.send(token);});


module.exports = router;