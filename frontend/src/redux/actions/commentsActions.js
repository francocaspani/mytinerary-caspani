import axios from "axios";

const commentActions = {
    addComment: (comment, token) => {
        return async (dispatch, getState) => {
            if (comment.comment !== '') {
                const res = await axios.post('http://localhost:4000/api/itinerary/comment', { comment }, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                return res
            } else {
                return {
                    data: {
                        success: false,
                        message: 'Please add a comment'
                    }
                }
            }
        }
    },
    modifyComment: (comment, token) => {
        return async (dispatch, getState) => {
            const res = await axios.put('http://localhost:4000/api/itinerary/comment', { comment }, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    },
    deleteComment: (commentId, token) => {
        return async (dispatch, getState) => {
            const res = await axios.post(`http://localhost:4000/api/itinerary/comment/${commentId}`, {}, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    },
    replyComment: (comment,commentId, token) => {
        return async (dispatch, getState) => {
            const res = await axios.put(`http://localhost:4000/api/itinerary/comment/${commentId}`, {comment}, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
        }
    }
}

export default commentActions