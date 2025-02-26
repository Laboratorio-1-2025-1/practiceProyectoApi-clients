// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

//Obtener todos los clientes
router.get('/', clientController.getAllClients);
//Obtener un cliente por id
router.get('/:id', clientController.getClientById);
//Registrar un cliente
router.post('/', clientController.createClient);
//Actualizar informacion de un cliente
router.put('/:id', clientController.updateClient);
//Borrar un cliente
router.delete('/:id', clientController.deleteClient);

module.exports = router;