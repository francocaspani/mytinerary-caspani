const initialState = {
    message: '',
    success: Boolean,
    userData: [],
    showModal: false
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'signUpUser':
            return{
                ...state,
                message: action.payload.message,
                success: action.payload.succes
            }
        case 'logInUser':
            let user = []
            if (action.payload.success){
                user = [action.payload.response.userData]
            }
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
                userData: user
            }
        case 'modal':
            return{
                ...state,
                showModal: action.payload
            }
        default:
            return state
    }
    
}

export default usersReducer