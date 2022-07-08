import axios from "axios";
import { urlBackend } from "../../components/App";

const commentActions = {
    addComment: (comment, token) => {
        return async (dispatch, getState) => {
            if (comment.comment !== '') {
                const res = await axios.post(`${urlBackend}/itinerary/comment`, { comment }, {
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
            const res = await axios.put(`${urlBackend}/itinerary/comment`, { comment }, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    },
    deleteComment: (info, commentId, token) => {
        return async (dispatch, getState) => {
            const res = await axios.post(`${urlBackend}/itinerary/comment/${commentId}`, {info}, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    },
    replyComment: (comment,commentId, token) => {
        return async (dispatch, getState) => {
            const res = await axios.put(`${urlBackend}/itinerary/comment/${commentId}`, {comment}, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    }
}

export default commentActions