
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch } from "react-redux";
import '../stylesheets/signup.css';
import usersActions from "../redux/actions/usersActions";



export default function LogIn() {

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        const loggedUser = {
            email: event.target[0].value,
            password: event.target[1].value,
            from: 'propietary-signup'
        };
        dispatch(usersActions.logInUser(loggedUser));
    }

    return (
        <>
            <div className="extern-signup">
                <p>Log in with:</p>
                <span><FacebookIcon /></span>
                <span><GoogleIcon /></span>
                <span><TwitterIcon /></span>
            </div>
            <div>
                <p>or</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="email" name="email" id="email" placeholder="Email" required />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Password" required />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>

                </form>
            </div>

        </>
    )
}