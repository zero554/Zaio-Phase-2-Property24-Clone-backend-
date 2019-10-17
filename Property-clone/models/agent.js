const Joi = require('joi');
const mongoose = require('mongoose');

const Agent = mongoose.model('agents', new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 3},
    lastName: {type: String, required: true, minlength: 3},
    email: {type: String, required: true, minlength: 5, unique: true},
    password: {type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
}));


function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().required().min(5).email(),
        password: Joi.string().min(8).max(13).required()
    };

    return Joi.validate(user, schema);
}

module.exports.Agent = Agent;
module.exports.validateUser = validateUser;