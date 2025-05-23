const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//crea un proyecto
//api/proyectos
router.post('/', 
    auth,
    [
        check('nombre', 'EL nombre del proyecto es obligatorio').not().isEmpty()
    ],  
    proyectoController.crearProyecto
);

//obtener todos los proyectos de un usuario
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
);

//Actualizar un proyecto
router.put('/:id', 
    auth,
    [
        check('nombre', 'EL nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//eliminar un proyecto
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;