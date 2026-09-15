const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');
const verificarToken = require('../middlewares/verificarToken');

router.post('/', verificarToken, publicacionController.crearPost);
router.get('/', verificarToken, publicacionController.listarPublicaciones);
router.put('/:id', verificarToken, publicacionController.actualizarPost);
router.delete('/:id', verificarToken, publicacionController.eliminarPost);

module.exports = router;