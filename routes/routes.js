const Router = require('express').Router();
const validator = require('../config/validator')
const passport = require('../config/passport')

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
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, readItineraries, handleLikes} = itinerariesControllers

Router.route('/itineraries')
.get(getItineraries)
.post(addItinerary)

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route('/itinerariesByCity/:id')
.get(readItineraries)

Router.route('/likes/:id')
.post(passport.authenticate('jwt',{ session: false}),handleLikes)

const usersControllers = require('../controllers/usersControllers');
const {signUpUser, logInUser, getUsers, verifyEmail, verifyToken} = usersControllers

Router.route('/auth/signup')
.post(validator,signUpUser)

Router.route('/auth/login')
.post(logInUser)

Router.route('/auth/users')
.get(getUsers)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

Router.route('/auth/verifytoken')
.get(passport.authenticate('jwt',{ session: false}), verifyToken)

const activitiesControllers = require('../controllers/activitiesControllers');
const {getActivities, getOneActivity, modifyActivity, addActivity, readActivities, removeActivity} = activitiesControllers

Router.route('/activities')
.get(getActivities)
.post(addActivity)

Router.route('/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

Router.route('/activitiesByItinerary/:id')
.get(readActivities)

const commentsControllers = require('../controllers/commentsControllers');
const {addComment, modifyComment, deleteComment, replyComment} = commentsControllers

Router.route('/itinerary/comment')
.post(passport.authenticate('jwt',{ session: false}),addComment)
.put(passport.authenticate('jwt',{ session: false}),modifyComment)

Router.route('/itinerary/comment/:id')
.post(passport.authenticate('jwt',{ session: false}),deleteComment)
.put(passport.authenticate('jwt',{ session: false}),replyComment)


module.exports = Router