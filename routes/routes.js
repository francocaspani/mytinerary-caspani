const Router = require('express').Router();
const validator = require('../config/validator')

const citiesControllers = require('../controllers/citiesControllers');
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers

Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

const itinerariesControllers = require('../controllers/itinerariesControllers');
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, readItineraries} = itinerariesControllers

Router.route('/itineraries')
.get(getItineraries)
.post(addItinerary)

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route('/itinerariesByCity/:id')
.get(readItineraries)

const usersControllers = require('../controllers/usersControllers');
const {signUpUser, logInUser, getUsers, verifyEmail} = usersControllers

Router.route('/auth/signup')
.post(validator,signUpUser)

Router.route('/auth/login')
.post(logInUser)

Router.route('/auth/users')
.get(getUsers)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

module.exports = Router