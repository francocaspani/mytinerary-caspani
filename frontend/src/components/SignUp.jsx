import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from "react-redux";
import '../stylesheets/signup.css';
import usersActions from "../redux/actions/usersActions";



export default function SignUp() {
    const cities = useSelector(store => store.citiesReducer.cities)

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            email: event.target[2].value,
            password: event.target[3].value,
            avatar: event.target[4].value,
            country: event.target[5].value,
            from: 'propietary-signup'
        }
        dispatch(usersActions.signUpUser(userData))
    }

    return (
        <>
            <div className="extern-signup">
                <p>Sign in with:</p>
                <span><FacebookIcon /></span>
                <span><GoogleIcon /></span>
                <span><TwitterIcon /></span>
            </div>
            <div>
                <p>or create an account</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="name" placeholder="First Name" required />
                        <input type="text" name="lastName" placeholder="Last Name" />
                    </div>
                    <div>
                        <input type="email" name="email" id="email" placeholder="Email" required />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Password" required />
                    </div>
                    <div>
                        <input type="text" name="avatar" id="avatar" placeholder="Profile Pic URL" required />
                    </div>
                    <div>
                        <select name="country" id="country">
                            {cities.map((everyCity, index) => <option key={index} value={everyCity.country}>{everyCity.country}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>

                </form>
            </div>

        </>
    )
}