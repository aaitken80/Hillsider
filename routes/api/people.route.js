var express = require('express')

var router = express.Router()

// Getting the People Controller

var PeopleController = require('../../controllers/people.controller');

// Map each API to the Controller FUnctions

router.get('/', PeopleController.getPeople)

router.post('/', PeopleController.createPeople)

router.put('/', PeopleController.updatePeople)

router.delete('/:id',PeopleController.removePeople)


// Export the Router

module.exports = router;