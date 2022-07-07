const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    nameItinerary: { type: String, required: true },
    nameUserAndAvatar: { type: Array, required: true },
    price: { type: Number, required: true },
    time: { type: Number, required: true },
    hashtags: { type: Array, required: true },
    likes: { type: Array },
    comments: [{
        userId: { type: mongoose.Types.ObjectId, ref: 'user' },
        comment: { type: String },
        date: { type: Date },
        replies: [{
            userId: { type: mongoose.Types.ObjectId, ref: 'user' },
            comment: { type: String },
            date: { type: Date }
        }]
    }],
    activities: [{ type: mongoose.Types.ObjectId, ref: 'activities' }],
    idCity: { type: mongoose.Types.ObjectId, ref: 'cities' }
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary