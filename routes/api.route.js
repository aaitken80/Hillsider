var express = require('express')

var router = express.Router()
var people = require('./api/people.route')
var garden = require('./api/garden.route')


router.use('/people', people);
router.use('/gardens', garden);


module.exports = router;