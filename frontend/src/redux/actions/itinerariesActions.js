import axios from "axios";

const itinerariesActions = {
    getItineraries: () => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get('http://localhost:4000/api/itineraries')
                dispatch({type: 'getItineraries', payload: res.data.response.itineraries})
            }   catch(error){
                console.log(error)
            }
        }
    },
    getItinerariesByCity: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`http://localhost:4000/api/itinerariesByCity/${id}`)
                dispatch({type: 'getItinerariesByCity', payload: res.data.response.itineraries})
            } catch(error){
                console.log(error)
            }
        }
    }
}

export default itinerariesActions