const Itinerary = require('../models/itinerary')

const itinerariesControllers ={
    getItineraries: async (req,res) => {
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find()
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req,res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try{
            itinerary = await Itinerary.findOne({_id:id})
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    addItinerary: async (req,res) => {
        const { nameItinerary,nameAndAvatar,price,time,hashtags,likes,activities,idCity } = req.body
        let itinerary
        let error = null
        try{
            itinerary = await new Itinerary({
                nameItinerary:nameItinerary,
                nameAndAvatar:nameAndAvatar,
                price:price,
                time:time,
                hashtags:hashtags,
                likes:likes,
                activities:activities,
                idCity:idCity
            }).save()
        }catch(err){error=err}
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    modifyItinerary: async (req,res) => {
        const id = req.params.id
        const itinerary = req.body
        let itinerarydb
        let error = null
        try{
            itinerarydb = await Itinerary.findOneAndUpdate({ _id:id }, itinerary, { new: true })
        }catch (err) {error= err}
        res.json({
            response: error ? 'ERROR' : { itinerarydb },
            success: error ? false : true,
            error: error
        })
    },
    removeItinerary: async (req,res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({_id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    readItineraries: async (req,res) => {
        const id = req.params.id
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find({ idCity:id })
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    }
}


module.exports = itinerariesControllers