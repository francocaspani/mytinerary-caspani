const Activity = require('../models/activity')

const activitiesControllers = {
    getActivities: async (req, res) => {
        let activities
        let error = null
        try {
            activities = await Activity.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    },
    getOneActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try {
            activity = await Activity.findOne({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activity },
            success: error ? false : true,
            error: error
        })
    },
    addActivity: async (req, res) => {
        const { name, img, description, idItinerary } = req.body
        let activity
        let error = null
        try {
            activity = await new Activity({
                name,
                img,
                description,
                idItinerary
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activity },
            success: error ? false : true,
            error: error
        })
    },
    modifyActivity: async (req, res) => {
        const id = req.params.id
        const activity = req.body
        let activitydb
        let error = null
        try {
            activitydb = await Activity.findOneAndUpdate({ _id: id }, activity, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activitydb },
            success: error ? false : true,
            error: error
        })
    },
    removeActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try {
            activity = await Activity.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activity },
            success: error ? false : true,
            error: error
        })
    },
    readActivities: async (req, res) => {
        const id = req.params.id
        let activities
        let error = null
        try {
            activities = await Activity.find({ idItinerary: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    }
}


module.exports = activitiesControllers