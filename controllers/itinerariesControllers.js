const Itinerary = require('../models/itinerary')

const itinerariesControllers = {
    getItineraries: async (req, res) => {
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOne({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    addItinerary: async (req, res) => {
        const { nameItinerary, nameUserAndAvatar, price, time, hashtags, likes, activities, idCity } = req.body
        let itinerary
        let error = null
        try {
            itinerary = await new Itinerary({
                nameItinerary: nameItinerary,
                nameUserAndAvatar: nameUserAndAvatar,
                price: price,
                time: time,
                hashtags: hashtags,
                likes: likes,
                activities: activities,
                idCity: idCity
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itinerary = req.body
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itinerarydb },
            success: error ? false : true,
            error: error
        })
    },
    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    readItineraries: async (req, res) => {
        const id = req.params.id
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find({ idCity: id })
                .populate('activities').populate('comments.userId',{ firstName: 1 , lastName:1, avatar:1}).populate('comments.replies.userId',{ firstName: 1 , lastName:1, avatar:1})
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: console.log(error)
        })
    },
    handleLikes: async (req, res) => {
        const idUser = req.user.id
        const idItinerary = req.params.id
        let itinerary
        try {
            itinerary = await Itinerary.find({ _id: idItinerary })
            itinerary = itinerary[0]
            if (itinerary.likes.length > 0) {
                if (itinerary.likes.indexOf(idUser) === -1) {
                    itinerary.likes.push(idUser)
                    await itinerary.save()
                    res.json({
                        response: {itinerary},
                        success: true,
                        message: 'Added to favourites'
                    })
                } else {
                    const index = itinerary.likes.indexOf(idUser)
                    itinerary.likes.splice(index, 1)
                    await itinerary.save()
                    res.json({
                        response: {itinerary},
                        success: true,
                        message: 'Removed from favourites'
                    })
                }
            } else {
                itinerary.likes.push(idUser)
                await itinerary.save()
                res.json({
                    response: {itinerary},
                    success: true,
                    message: 'Added to favourites'
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                response: 'Error',
                success: false,
                message: 'Something went wrogn, please try again'
            })
        }

    }
}


module.exports = itinerariesControllers