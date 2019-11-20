const express = require('express');
const {Agent, validateUser} = require('../models/agent');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');



router.get('/', async (req, res) => {

    const agents = await Agent
        .find()
        .sort({firstName: 1});
    res.send(agents);

});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);

    // user object destructuring --> constant {error} = ... and user error instead of result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let agent = await Agent.findOne({email: req.body.email});
    if (agent) return res.status(400).send('Agent is already registered.') 

    agent = new Agent (_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));



    await agent.save()
    const token = jwt.sign({_id: agent._id}, config.get('jwtPrivateKey'));

    res.header('x-auth-token', token).send(token);

});

router.put('/:id', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('The agent with the given ID does not exist.');

    const agent = await Agent.findByIdAndUpdate(req.params.id, {
        password: req.body.password
    }, {new: true});

    if (!error) return res.status(404).send('The agent with the given ID does not exist.');

    res.send(agent);
});

router.delete('/:id', async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('The agent with the given ID does not exist.');

    const agent = await Agent.findOneAndRemove(req.body.id);

    if (!agent) return res.status(404).send("The agent with the given id does not exist");
    res.send(agent);
    
});

router.get('/:id', async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('The agent with the given ID does not exist.');

    const agent = await Agent.findById(req.params.id);
    
    if (!agent) return res.status(404).send('The agent with the given ID does not exist');
    res.send(agent);
});

module.exports = router;