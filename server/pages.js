const path = require('path');
const express = require('express');

const router = express.Router();

const clientPath = path.resolve(`${__dirname}/../client`);

// Middleware
router.use(function timeLog (req, res, next) {
    //console.log('time: ', Date.now());
    next()
})

// Routes
router.get('/', (req, res) => {
    res.sendFile(clientPath + "/index.html");
})

module.exports = router;