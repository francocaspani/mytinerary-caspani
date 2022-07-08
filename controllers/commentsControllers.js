const Itinerary = require('../models/itinerary')

const commentsControllers = {

    addComment: async (req, res) => {
        const { idItinerary, comment } = req.body.comment
        const user = req.user.id
        try {
            const newComment = await Itinerary.findOneAndUpdate({ _id: idItinerary }, { $push: { comments: { comment: comment, userId: user, date: Date.now() } } }, { new: true })
            res.json({
                success: true,
                response: { newComment },
                message: 'Comment posted successfully'
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Something went wrong, please try again'
            })
        }
    },
    modifyComment: async (req, res) => {
        const { commentId, comment, isReply, parentCommentId } = req.body.comment
        if (isReply) {
            try {
                const updatedComment = await Itinerary.findOne({ "comments.replies._id": commentId })
                console.log(updatedComment.comments)
                console.log(parentCommentId)
                const index = updatedComment.comments.map(comment => (comment._id).toString()).indexOf(parentCommentId)
                const indexReply = updatedComment.comments[index].replies.map(reply => (reply._id).toString()).indexOf(commentId)
                updatedComment.comments[index].replies[indexReply].comment = comment
                await updatedComment.save()
                res.json({
                    success: true,
                    response: { updatedComment },
                    message: 'Comment modified successfully'
                })
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Something went wrong, please try again'
                })
            }
        } else {
            try {
                updatedComment = await Itinerary.findOneAndUpdate({ "comments._id": commentId }, { $set: { "comments.$.comment": comment, "comments.$.date": Date.now() } }, { new: true })
                res.json({
                    success: true,
                    response: { updatedComment },
                    message: 'Comment modified successfully'
                })
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Something went wrong, please try again'
                })
            }
        }
    },
    deleteComment: async (req, res) => {
        const commentId = req.params.id
        const { isReply, parentCommentId } = req.body.info
        if (isReply) {
            try {
                const deletedComment = await Itinerary.findOne({ "comments.replies._id": commentId })
                const index = deletedComment.comments.map(comment => (comment._id).toString()).indexOf(parentCommentId)
                const indexReply = deletedComment.comments[index].replies.map(reply => (reply._id).toString()).indexOf(commentId)
                deletedComment.comments[index].replies.splice(indexReply,1)
                await deletedComment.save()
                res.json({
                    success: true,
                    response: { deletedComment },
                    message: 'Comment deleted successfully'
                })
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Something went wrong, please try again'
                })
            }
        } else {
            try {
                const deletedComment = await Itinerary.findOneAndUpdate({ 'comments._id': commentId }, { $pull: { comments: { _id: commentId } } }, { new: true })
                res.json({
                    success: true,
                    response: { deletedComment },
                    message: 'Comment deleted successfully'
                })
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: 'Something went wrong, please try again'
                })
            }
        }

    },
    replyComment: async (req, res) => {
        const commentId = req.params.id
        const { comment } = req.body.comment
        console.log(comment)
        const user = req.user.id
        try {
            const updatedComment = await Itinerary.findOneAndUpdate({ "comments._id": commentId }, { $push: { 'comments.$.replies': { comment: comment, userId: user, date: Date.now() } } }, { new: true })
            res.json({
                success: true,
                response: { updatedComment },
                message: 'Comment posted successfully'
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Something went wrong, please try again'
            })
        }
    }
}

module.exports = commentsControllers