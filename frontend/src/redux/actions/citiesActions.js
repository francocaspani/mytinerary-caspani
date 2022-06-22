import axios from "axios";

const citiesActions = {
    getCities: () => {
        return async(dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type:'getCities', payload: res.data.response.cities})
        }
    },
    filterCities: (cities, value) => {
        return (dispatch,getState) => {
            dispatch({type:'filterCities', payload:{cities, value}})
        }
    },
    getOneCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/cities/${id}`)
            dispatch({type:'getOneCity', payload: res.data.response.city})
        }
    }
}

export default citiesActions