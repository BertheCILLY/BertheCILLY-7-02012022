const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//route POST car le front renvie l'adress mail et mot de passe 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;