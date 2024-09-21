let express = require('express');
let router = express.Router();

const Libros = require('../controllers/libros.controller.js');


router.post('/api/libro', Libros.create);
router.get('/api/libros', Libros.retrieveAllLibros);
router.get('/api/libros/:id', Libros.getLibroById);
router.put('/api/librosA/:id', Libros.updateLibroById);
router.delete('/api/librosD/:id', Libros.deleteLibroById);

module.exports = router;
