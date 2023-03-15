const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const authorize = require('../Auth/auth');
const moment = require('moment');
const router = express.Router();






router.post('/register', (req, res, next) => {


    const email = req.body.email;
    const password = req.body.password;


    if (!email || !password) {
        res.status(400).json({
            error: true,
            message: 'Request body incomplete, both email and password are required'
        });
        return;
    }


    const queryUsers = req.db.from('users').select('*').where({ email: email })
        .then((users) => {
            if (users.length > 0) {
                res.status(409).json({
                    error: true,
                    message: 'User already exists'
                });
                return;
            }


            const saltRounds = 10;
            const hash = bcrypt.hashSync(password, saltRounds);
            return req.db.from('users').insert({ email: email, password_hash: hash })
                .then(() => {
                    res.status(201).json({ message: 'User created' });
                });
        });
});


router.post('/login', (req, res, next) => {


    const email = req.body.email;
    const password = req.body.password;


    if (!email || !password) {
        res.status(400).json({
            error: true,
            message: 'Request body incomplete, both email and password are required'
        });
        return;
    }


    const queryUser = req.db.from('users').select('*').where({ email: email })
        .then((users) => {
            if (users.length === 0) { return; }


            const user = users[0];
            return bcrypt.compare(password, user.password_hash);
        }).then((match) => {
            if (!match) {
                res.status(401).json({
                    error: true,
                    message: 'Incorrect email or password'
                });
                return;
            }


            const expiresIn = 60 * 60 * 24
            const exp = Date.now() + expiresIn * 1000;
            const token = jwt.sign({ email, exp }, process.env.SECRET_KEY);
            res.status(200).json({
                token: token,
                token_type: 'Bearer',
                expires_in: expiresIn
            });
        });
});


router.get('/:email/profile', authorize, (req, res, next) => {


    const email = req.params.email;


    const queryUsers = req.db.from('users').first('*').where({ email: email })
        .then((user) => {

            if (!user) {
                res.status(404).json({
                    error: true,
                    message: 'User not found'
                });
                return;
            }


            let userInfo = {
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }

            if (req.token) {
                const jwtCheck = jwt.verify(req.token, process.env.SECRET_KEY);


                if (req.isAuthenticated && jwtCheck.email === email) {
                    userInfo.dob = user.dob;
                    userInfo.address = user.address;
                }
            }

            res.status(200).json(userInfo);
        });
});


router.put('/:email/profile', authorize, (req, res, next) => {


    if (!req.isAuthenticated) {
        res.status(401).send({
            error: true,
            message: `Authorization header ('Bearer token') not found`
        });
        return;
    }


    const email = req.params.email;
    const userInfo = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        dob: req.body.dob,
        address: req.body.address
    }


    if (!userInfo.first_name || !userInfo.last_name || !userInfo.dob || !userInfo.address) {
        res.status(400).json({
            error: true,
            message: 'Request body incomplete: firstName, lastName, dob and address are required.'
        });
        return;
    }


    if (typeof userInfo.first_name !== 'string' || typeof userInfo.last_name !== 'string' || typeof userInfo.address !== 'string') {
        res.status(400).json({
            error: true,
            message: 'Request body invalid: firstName, lastName and address must be strings only.'
        });
        return;
    }

    function IsValidDate(pText) {
        var isValid = false;
        var t = pText.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);

        if (t !== null) {
            var y = +t[1], m = +t[2], d = +t[3];
            var date = new Date(y, m - 1, d);

            isValid = (date.getFullYear() === y && date.getMonth() === m - 1);
        }

        return isValid;
    }


    if (!IsValidDate(userInfo.dob.replaceAll('-', '/'))) {
        res.status(400).json({
            error: true,
            message: 'Invalid input: dob must be a real date in format YYYY-MM-DD.'
        });
        return;

    }

    if (isNaN(new Date(userInfo.dob).getTime()) || !moment(userInfo.dob, 'YYYY-MM-DD').isValid()) {
		return res.status(400).json({
			error: true,
			message: 'Invalid input: dob must be a real date in format YYYY-MM-DD.',
		});
	}

    const dobDate = new Date(userInfo.dob)


    if (dobDate > Date.now()) {
        res.status(400).json({
            error: true,
            message: 'Invalid input: dob must be a date in the past.'
        });
        return;
    }


    const jwtCheck = jwt.verify(req.token, process.env.SECRET_KEY);
    if (jwtCheck.email !== email) {
        res.status(403).json({
            error: true,
            message: 'Forbidden'
        });
        return;
    }


    const queryUsers = req.db.from('users').update(userInfo).where({ email: email })
        .then(() => {
            return req.db.from('users').first('*').where({ email: email })
        })
        .then((user) => {


            res.status(200).json({
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                dob: user.dob,
                address: user.address
            });
        })
});



module.exports = router;