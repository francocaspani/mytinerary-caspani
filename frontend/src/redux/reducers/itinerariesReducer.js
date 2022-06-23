const initialState = {
    itineraries: [],
    itinerariesByCity: []
}

const itinerariesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'getItineraries':
            return{
                ...state,
                itineraries: action.payload
            }
        case 'getItinerariesByCity':
            return{
                ...state,
                itinerariesByCity: action.payload
            }
        default:
            return state
    }
}

export default itinerariesReducer