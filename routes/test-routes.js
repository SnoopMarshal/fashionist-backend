const express = require('express');

const router = express.Router();

router.get('/__test', (req, res, next) => {
    res.render('index');
})

module.exports = router