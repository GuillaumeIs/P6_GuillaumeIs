// Contient les routes permettant l'inscription (signup) et l'authentification (login) //

const express = require('express');
const router = express.Router();
const userCTRL = require('../controllers/User');

router.post('/signup', userCTRL.signup);
router.post('/login', userCTRL.login);

module.exports = router;
