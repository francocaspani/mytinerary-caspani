const initialState = {
    cities:[],
    citiesFiltered: [],
    city:[]
}

const citiesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'getCities':
            return{
                ...state,
                cities: action.payload,
                citiesFiltered: action.payload
            }
        case 'filterCities':
            const filtered = state.cities.filter(cities => cities.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                citiesFiltered : filtered
            }
        case 'getOneCity':
            return{
                ...state,
                city: action.payload
            }
        default:
            return state
    }
}

export default citiesReducer