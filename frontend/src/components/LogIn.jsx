import { useDispatch, useSelector } from "react-redux";
import '../stylesheets/signup.css';
import usersActions from "../redux/actions/usersActions";
import Swal from 'sweetalert2'
import GoogleLogIn from './GoogleLogIn';

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    background: '#000000',
    color: '#ffff',
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function LogIn() {

    const dispatch = useDispatch()

    const HandleSubmit = async (event) => {
        event.preventDefault()
        const loggedUser = {
            email: event.target[0].value,
            password: event.target[1].value,
            from: 'propietary-signup'
        }

        const res = await dispatch(usersActions.logInUser(loggedUser))

        Toast.fire({
            icon: res.data.success ? 'success' : 'error',
            title: res.data.message
        })

    }

    return (
        <>
            <div className='form'>
                <form onSubmit={HandleSubmit}>
                    <span className='input'>
                        <input type="email" name="email" id="email" placeholder="Email" required />
                    </span>
                    <span className='input'>
                        <input type="password" name="password" id="password" placeholder="Password" required />
                    </span>
                    <button className='full-rounded' type="submit"><span>Log In</span>
                        <div className="border full-rounded"></div></button>
                </form>
            </div>
            <div className="extern-signup">
                <p> Or log in with:</p>
                <div className='signup-icons'>

                    <span><GoogleLogIn /></span></div>

            </div>
        </>
    )
}

export default LogIn