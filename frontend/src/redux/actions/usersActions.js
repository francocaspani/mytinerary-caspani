import axios from "axios";

const usersActions = {
    signUpUser: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })
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
                dispatch({type: 'logInUser', payload:res.data})
                console.log(res)
                if (res.data.success) {
                    localStorage.setItem('token', res.data.response.token)
                }
                return res
            } catch(error) {
                console.log(error);
            }
        }
    },
    logOutUser: () => {
        return async (dispatch, getState) => {
           // const res = axios.post('http://localhost:4000/api/auth/logout', { closeUser})
            localStorage.removeItem('token')
            dispatch({type: 'logOutUser', payload: null})//veeer
        }
    },
    verifyToken: (token) => {
        return async (dispatch, getState) => {
            await axios.get('http://localhost:4000/api/auth/verifytoken', {
                headers: {'Authorization' : 'Bearer ' + token}})
                .then(user => {
                    if (user.data.success){
                        dispatch({type: 'logInUser', payload: user.data})
                        console.log(user)
                    } else {localStorage.removeItem('token')}
                }).catch(error => {
                    if (error.response.status === 401)
                    dispatch({type: 'logOutUser', payload: null}) //veeeeer
                    localStorage.removeItem('token')
                })
        }
    }
}

export default usersActions