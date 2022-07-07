import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useSelector, useDispatch } from "react-redux";
import commentActions from '../redux/actions/commentsActions';

function Comments({ itinerary }) {
    const user = useSelector(store => store.usersReducer.userData)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const data = itinerary.comments?.map(comment =>

    ({
        userId: comment.userId._id,
        comId: comment._id,
        fullName: comment.userId.firstName,
        userProfile: itinerary._id,
        text: comment.comment,
        avatarUrl: comment.userId.avatar,
        replies: comment.replies?.map(reply => ({
            userId: reply.userId,
            text: reply.comment,
            avatarUrl: reply.avatarUrl,
            fullName: reply.fullName
        }))
    })
    )

    const handleAddComment = async (data) => {
        console.log(data)
        const comment = {
            idItinerary: data.userProfile,
            comment: data.text
        }

        await dispatch(commentActions.addComment(comment, token))
    }

    const handleModifyComment = async (data) => {
        console.log(data)
        const comment = {
            commentId: data.comId,
            comment: data.text
        }
        await dispatch(commentActions.modifyComment(comment, token))
    }

    const handleDeletComment = async (data) => {
        console.log(data)
        await dispatch(commentActions.deleteComment(data.comIdToDelete, token))
    }
    const handleReplyComment = async (data) => {
        console.log(data)
        const comment = {
            comment: data.text,
            avatarUrl: data.avatarUrl,
            fullName: data.fullName
        }
        console.log(data.text)
        const commentId = data.repliedToCommentId
        await dispatch(commentActions.replyComment(comment, commentId, token))
    }


    return (
        <CommentSection
            currentUser={user ? {
                currentUserId: user.id,
                currentUserImg: user.avatar,
                currentUserProfile: itinerary._id,
                currentUserFullName: user.firstName
            } : null
            }
            logIn={{
                loginLink: 'http://localhost:3000/login',
                signupLink: 'http://localhost:3000/signup'
            }}
            commentData={data}
            onSubmitAction={(data) => handleAddComment(data)}
            onEditAction={(data) => handleModifyComment(data)}
            onDeleteAction={(data) => handleDeletComment(data)}
            onReplyAction={(data) => handleReplyComment(data)}
        />
    )
}

export default Comments