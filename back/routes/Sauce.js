// Contient les routes permettant l'ajout et la modification d'un produit (Sauce) //

const express = require('express');
const router = express.Router();
const sauceCTRL = require('../controllers/Sauce');
const auth = require('../middleware/Auth');
const multer = require('../middleware/multerConfig');

router.get('/', auth, sauceCTRL.getAllSauces);
router.post('/', auth, multer, sauceCTRL.postAddSauce);
router.get('/:id', auth, sauceCTRL.getOneSauce);
router.put('/:id', auth, multer, sauceCTRL.putModifSauce);
router.delete('/:id', auth, sauceCTRL.deleteSauce);
router.post('/:id/like', auth, sauceCTRL.postLike);


module.exports = router;
