import {useEffect} from "react";
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import Swal from 'sweetalert2'




export default function GoogleLogIn(){
    const dispatch = useDispatch()

    const showModal = useSelector(store => store.usersReducer.showModal)

    const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

        async function handleCallbackResponse(response){
            let userObject = jwt_decode(response.credential);
            const loggedUser = {
                email: userObject.email,
                password: `Aa${userObject.sub}`,
                from: 'google'
            }
            const res = await dispatch(usersActions.logInUser(loggedUser))
            
            Toast.fire({
                icon: res.data.success ? 'success' : 'error',
                title: res.data.message
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
    },[])

    return(
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}