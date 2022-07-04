import LogIn from "../components/LogIn";
import '../stylesheets/signup.css';
import { Link as LinkRouter } from "react-router-dom"
import { motion } from 'framer-motion';

export default function PageLogIn() {

    return (

        <motion.div className="sign-up"
        initial={{opacity:0}}
    animate={{opacity:1, transition: {duration: 0.5}}}
        >
            <div className="sign-up-container"
            >
                <div className="title-logo">
                    <img className="logo-signup" src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="" />
                    <h1>My Tinerary</h1>
                </div>
                <LogIn />
                <div className="footer-signup">
                    <p>Not a member? Go to <LinkRouter className='link signup-login' to='/signup'>Sign up</LinkRouter></p>
                </div>
            </div>
            <div className="hero-signup"
            >
                <h1>Log in to your next destination</h1>
            </div>
        </motion.div>

    )
}