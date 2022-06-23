const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    nameItinerary:{type:String, required:true},
    nameUserAndAvatar:{type:Array, required:true},
    price:{type:Number, required:true},
    time:{type:Number, required:true},
    hashtags:{type:Array, required:true},
    likes:{type:Number, required:true},
    idCity:{type:mongoose.Types.ObjectId, ref:'cities'}
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary