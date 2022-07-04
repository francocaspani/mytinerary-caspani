import SignUp from "../components/SignUp";
import '../stylesheets/signup.css';
import { Link as LinkRouter } from "react-router-dom"
import { motion } from 'framer-motion';

export default function PageSignUp() {

    return (

        <motion.div className="sign-up"
        initial={{opacity:0}}
        animate={{opacity:1, transition: {duration: 0.5}}}
        >
            <div className="hero-signup"
            >
                <h1>Sign up to your next adventure</h1>
            </div>
            <div className="sign-up-container"
            >
                <div className="title-logo">
                    <img className="logo-signup" src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="" />
                    <h1>My Tinerary</h1>
                </div>
                <SignUp />
                <div className="footer-signup">
                    <p>Already a member? Go to <LinkRouter className='link signup-login' to='/login'>Log in</LinkRouter></p>
                </div>
            </div>
        </motion.div>

    )
}