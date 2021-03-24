const express = require('express');

const router = express.Router();

router.get('/__test', (req, res, next) => {
    res.send("Hello, World!")
})