import {useEffect} from "react";
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import Swal from 'sweetalert2'

export default function GoogleAuth({country}){
    const dispatch = useDispatch()

    const showModal = useSelector(store => store.usersReducer.showModal)

    async function handleCallbackResponse(response){
        let userObject = jwt_decode(response.credential);
        const userData = {
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            email: userObject.email,
            password: `Aa${userObject.sub}`,
            avatar: userObject.picture,
            country: country,
            from: 'google'
        }
        const res = await dispatch(usersActions.signUpUser(userData))
        
        Swal.fire({
            title: res.data.message,
            width: 600,
            padding: '3em',
            color: '#ffff',
            confirmButtonColor: '#212121',
            background: '#0000',
            backdrop: `rgba(0,0,0,0.8)`,
            didClose: () => {
                dispatch({type: 'modal', payload: !showModal})
            }
        })
    }

    if (!country) {
        async function handleCallbackResponse(response){
            let userObject = jwt_decode(response.credential);
            const loggedUser = {
                email: userObject.email,
                password: `Aa${userObject.sub}`,
                from: 'google'
            }
            const res = await dispatch(usersActions.logInUser(loggedUser))
            
            Swal.fire({
                title: res.data.message,
                width: 600,
                padding: '3em',
                color: '#ffff',
                confirmButtonColor: '#212121',
                background: '#0000',
                backdrop: `rgba(0,0,0,0.8)`,
                didClose: () => {
                    dispatch({type: 'modal', payload: !showModal})
                }
            })
        }
    } 
    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id: '92984163218-c5acji72l93famcjqe92r44monjm446s.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            {theme: 'outline', size: 'large'}
        )
    },[])

    return(
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}