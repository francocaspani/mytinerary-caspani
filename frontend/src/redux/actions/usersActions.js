import axios from "axios";

const usersActions = {
    signUpUser: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })
                console.log(res)
                dispatch({type: 'signUpUser', payload: res.data})
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },
    logInUser: (loggedUser) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/login', { loggedUser })
                console.log(res)
                dispatch({type: 'logInUser', payload:res.data})
                return res
            } catch(error) {
                console.log(error);
            }
        }
    }
}

export default usersActions