
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import '../stylesheets/signup.css';

export default function PageSignUpLogIn({ logIn }) {
    const isLogIn = logIn

    return (
        <div className="sign-up">
            <div className="hero-signup">
                <h1>Sign up to your next adventure</h1>
            </div>
            <div className="sign-up-container">
                <div className="title-logo">
                    <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="" />
                    <h1>My Tinerary</h1>
                </div>
                {isLogIn ? <LogIn /> : <SignUp />
                }
            </div>
        </div>
    )
}