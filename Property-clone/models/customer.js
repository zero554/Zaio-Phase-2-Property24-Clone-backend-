const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');


const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 3},
    lastName: {type: String, required: true, minlength: 3},
    email: {type: String, required: true, minlength: 10, unique: true},
    password: {type: String, required: true, minlength: 5, maxlength: 1024}
});

const Customer = mongoose.model('customers', customerSchema);

function validateCustomer(customer) {
    return Joi.validate(customer, {
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(8).max(255).required()
    });
}

customerSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey')); 
    return token;
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;