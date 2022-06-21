const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    nameItinerary:{type:String, required:true},
    nameAndAvatar:{type:Object, required:true},
    price:{type:Number, required:true},
    time:{type:Number, required:true},
    hashtags:{type:Array, required:true},
    likes:{type:Number, required:true},
    activities:{type:Object, required:true},
    idCity:{type:String, required:true}
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary