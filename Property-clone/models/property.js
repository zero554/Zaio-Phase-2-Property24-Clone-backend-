const mongoose = require('mongoose');
const Joi = require('joi');


const Propery = mongoose.model('properties', new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    location: {type: String, required: true, minlength: 3},
    imageUrl: {type: String, required: true, minlength: 5},
    price: {type: String, required: true, minlength: 1}
}));

function validateProperty(property) {
    return Joi.validate(property, {
        name: Joi.string().min(3).required(),
        location: Joi.string().min(3).required(),
        imageUrl: Joi.string().min(5).required(),
        price: Joi.string().min(1).required()
    });
}

module.exports.Propery = Propery;
module.exports.validateProperty = validateProperty;