import axios from "axios";
import { urlBackend } from "../../components/App";

const citiesActions = {
    getCities: () => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/cities`)
                dispatch({ type: 'getCities', payload: res.data.response.cities })
            } catch (error) {
                console.log(error)
            }
        }
    },
    filterCities: (value) => {
        return (dispatch, getState) => {
            dispatch({ type: 'filterCities', payload: value })
        }
    },
    getOneCity: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/cities/${id}`)
                dispatch({ type: 'getOneCity', payload: res.data.response.city })
            } catch (error) {
                console.log(error)
            }

        }
    }
}

export default citiesActions