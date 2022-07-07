import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useSelector, useDispatch } from "react-redux";
import commentActions from '../redux/actions/commentsActions';
import '../stylesheets/comments.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from 'react';

function Comments({ itinerary, setReload }) {
    const user = useSelector(store => store.usersReducer.userData)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')


    const data = itinerary.comments?.map(comment =>

    ({
        userId: comment.userId._id,
        comId: comment._id,
        fullName: `${comment.userId.firstName} ${comment.userId.lastName ? comment.userId.lastName : null}`,
        userProfile: itinerary._id,
        text: comment.comment,
        avatarUrl: comment.userId.avatar,
        replies: comment.replies?.map(reply => ({
            comId: reply._id,
            userId: reply.userId._id,
            text: reply.comment,
            avatarUrl: reply.userId.avatar,
            fullName: `${reply.userId.firstName} ${reply.userId.lastName ? reply.userId.lastName : null}`,

        }))
    })
    )

    const handleAddComment = async (data) => {
        console.log(data)
        const comment = {
            idItinerary: data.userProfile,
            comment: data.text
        }

        const res = await dispatch(commentActions.addComment(comment, token))
        if (res.data.success) {
            toast.success(res.data.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 4000,
            })
        }
        setReload()
    }

    const handleModifyComment = async (data) => {
        console.log(data)
        let isReply
        let parentCommentId
        if (data.parentOfEditedCommentId) {
            isReply = true
            parentCommentId = data.parentOfEditedCommentId
        } else {
            isReply = false
            parentCommentId = undefined

        }
        const comment = {
            commentId: data.comId,
            comment: data.text,
            isReply: isReply,
            parentCommentId: parentCommentId
        }
        const res = await dispatch(commentActions.modifyComment(comment, token))
        if (res.data.success) {
            toast.success(res.data.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 4000,
            })
        }
        setReload()
    }

    const handleDeletComment = async (data) => {
        console.log(data)
        let isReply
        let parentCommentId
        if(data.parentOfDeleteId){
            // eliminar reply
            isReply = true
            parentCommentId = data.parentOfDeleteId
        }else{
            //eliminar commentario
            isReply = false
            parentCommentId = undefined
        }
        const info = {
            isReply: isReply,
            parentCommentId: parentCommentId
        }
        const res = await dispatch(commentActions.deleteComment(info, data.comIdToDelete, token))
        if (res.data.success) {
            toast.success(res.data.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 4000,
            })
        }
        setReload()
    }
    const handleReplyComment = async (data) => {
        let commentID = null
        console.log(data)
        const comment = {
            comment: data.text,
            repliedTo: data.repliedToCommentId
        }
        if (data.parentOfRepliedCommentId) {
            const commentId = data.parentOfRepliedCommentId
            commentID = commentId
        } else {
            const commentId = data.repliedToCommentId
            commentID = commentId
        }

        const res = await dispatch(commentActions.replyComment(comment, commentID, token))
        if (res.data.success) {
            toast.success(res.data.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 4000,
            })
        }
        setReload()
    }


    return (
        <CommentSection
            currentUser={user ? {
                currentUserId: user.id,
                currentUserImg: user.avatar,
                currentUserProfile: itinerary._id,
                currentUserFullName: `${user.firstName} ${user.lastName ? user.lastName : null}`
            } : null
            }
            logIn={{
                loginLink: '/login',
                signupLink: '/signup'
            }}
            advancedInput={true}
            commentData={data}
            onSubmitAction={(data) => handleAddComment(data)}
            onEditAction={(data) => handleModifyComment(data)}
            onDeleteAction={(data) => handleDeletComment(data)}
            onReplyAction={(data) => handleReplyComment(data)}
            inputStyle={{ backgroundColor: 'black', color: 'white', height: '2rem' }}
            formStyle={{ backgroundColor: 'rgb(0, 0, 0, 0.40)' }}
            replyInputStyle={{ backgroundColor: 'black', color: 'white', height: '2rem' }}
            submitBtnStyle={{ backgroundColor: 'black', border: '2px solid white' }}
            overlayStyle={{ backgroundColor: 'rgb(0, 0, 0, 0.20)', borderRadius: '.5rem', color: 'black' }}
            hrStyle={{ border: '0px' }}
        />
    )
}

export default Comments