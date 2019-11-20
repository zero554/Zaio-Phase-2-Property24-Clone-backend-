const config = require('config');
const express = require('express');
const { Agent } = require('../models/agent');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    // user object destructuring --> constant {error} = ... and user error instead of result.error
    if (error) return res.status(400).send(error.details[0].message);
    

    let agent = await Agent.findOne({email: req.body.email});
    if (!agent) return res.status(400).send('Invalid email or password.'); 
    

    if (req.body.password !== agent.password) return res.status(400).send('Invalid email or password.');
    const token = jwt.sign({ _id: agent._id}, config.get('jwtPrivateKey'));

    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().required().min(5).email(),
        password: Joi.string().min(8).max(13).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;

// moving the private key into an enviroment viariable