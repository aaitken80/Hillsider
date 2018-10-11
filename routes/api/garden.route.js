var express = require('express')

var router = express.Router()

// Getting the Garden Controller

var GardenController = require('../../controllers/garden.controller');

// Map each API to the Controller FUnctions

router.get('/', GardenController.getGarden)

router.post('/', GardenController.createGarden)

router.put('/', GardenController.updateGarden)

router.delete('/:id',GardenController.removeGarden)


// Export the Router

module.exports = router;