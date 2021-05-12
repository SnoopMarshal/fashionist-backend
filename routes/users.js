const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const validateRegisterInput = require('./../validation/register');
const validateLoginInput = require('./../validation/login');

const User = require('./../models/User');
const auth = require('./../middleware/auth')
const { secretKey } = require('./../config');

router.get('/', auth, async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
})

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already in use'});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req,res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(400).json({emailNotFound: "Email not found"});
        }

        bcrypt.compare(password, user.password).then(isMathced => {
            if (isMathced) {
                const payload ={
                    id: user.id,
                    name: user.name
                };


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
                        });
                    }
                )
            } else {
                return res.status(400).json({passwordIncorrect: "Incorrect password"});
            }
        });
    });
});
router.post('/login-google', (req,res) => {
    const email = req.body.email;
    User.findOne({email}).then(user => {
        if (!user) {
            const newUser = new User({
                name: req.body.name,
                avatar: req.body.avatar,
                email: req.body.email,
                provider: 'Google'
            });
            newUser.save()
            .then(user => {
                const payload ={
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    secretKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                )
            })
            .catch(err => console.log(err));
        }
        else {
            const payload ={
                id: user.id,
                name: user.name
            };
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
                    });
                }
            )
        }
    });
});

module.exports = router;