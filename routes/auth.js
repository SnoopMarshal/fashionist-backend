const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const { secretKey } = require('./../config');

const validateLoginInput = require('./../validation/login');

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    console.log(password);

    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(400).json({emailNotFound: 'Email not found!'});
        }
        console.log(user);
        bcrypt.compare(password, user.password).then(isMatched => {
            if (isMatched) {
                const payload = {
                    id: user.id,
                    name: user.name
                }

                jwt.sign(
                    payload,
                    secretKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token
                        })
                    }
                )
            } else {
                return res.status(400).json({passwordIncorrect: "incorrect password"});
            }
        })
    })
})


module.exports = router;



