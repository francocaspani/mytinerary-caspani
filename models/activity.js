const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String },
    idItinerary: { type: mongoose.Types.ObjectId, ref: 'itineraries' }
})

const Activity = mongoose.model('activities', activitySchema)
module.exports = Activity