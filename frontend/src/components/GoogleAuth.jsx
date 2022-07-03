import {useEffect} from "react";
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export default function GoogleAuth({country}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
            from: 'Google Account'
        }
        const res = await dispatch(usersActions.signUpUser(userData))
        
        Swal.fire({
            title: res.data.message,
            width: 600,
            padding: '3em',
            color: '#ffff',
            confirmButtonColor: '#212121',
            background: '#000000',
            backdrop: `rgba(0,0,0,0.8)`,
            didClose: () => {
                dispatch({type: 'modal', payload: !showModal})
                if (res.data.success){
                    navigate('/login')
                }
                
            }
        })
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
        // eslint-disable-next-line
    },[])

    return(
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}