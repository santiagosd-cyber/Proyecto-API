const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/verificarToken');

router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.get('/perfil', verificarToken, usuarioController.verPerfil);

module.exports = router;