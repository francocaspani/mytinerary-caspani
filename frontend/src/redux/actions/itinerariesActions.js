import axios from "axios";
import { urlBackend } from "../../components/App";

const itinerariesActions = {
    getItineraries: () => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/itineraries`)
                dispatch({type: 'getItineraries', payload: res.data.response.itineraries})
            }   catch(error){
                console.log(error)
            }
        }
    },
    getItinerariesByCity: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/itinerariesByCity/${id}`)
                dispatch({type: 'getItinerariesByCity', payload: res.data.response.itineraries})
                return res
            } catch(error){
                console.log(error)
            }
        }
    },
    handleLikes: (idItinerary,token) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`${urlBackend}/likes/${idItinerary}`,{}, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                return res
            } catch(error){
                console.log(error)
            }
        }
    }
}

export default itinerariesActions