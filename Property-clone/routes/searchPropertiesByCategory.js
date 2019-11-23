const express = require('express');
const {Propery, validateProperty} = require('../models/property');
const router = express.Router();
const mongoose = require('mongoose');

router.get("/:name", async (req, res) => {
    
});

module.exports = router;