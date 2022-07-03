import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import '../stylesheets/signup.css';
import { Link as LinkRouter } from "react-router-dom"

export default function PageSignUpLogIn({ logIn }) {
    const isLogIn = logIn

    return (
        
        <div className="sign-up">
            <div className="hero-signup">
            {isLogIn ? <h1>Log in to your next destination</h1> :<h1>Sign up to your next adventure</h1> }
            </div>
            <div className="sign-up-container">
                <div className="title-logo">
                    <img className="logo-signup" src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="" />
                    <h1>My Tinerary</h1>
                </div>
                {isLogIn ? <LogIn /> : <SignUp /> }
                <div className="footer-signup">
                    {isLogIn ? <p>Not a member? Go to <LinkRouter className='link' to='/signup'>Sign up</LinkRouter></p>:<p>Already a member? Go to <LinkRouter className='link' to='/login'>Log in</LinkRouter></p>}
                </div>
            </div>
        </div>
        
    )
}