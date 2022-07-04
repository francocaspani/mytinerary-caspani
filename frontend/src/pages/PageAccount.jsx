
import '../stylesheets/signup.css';
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";
import '../stylesheets/account.css'
import { useState } from "react";

export default function PageAccount() {
    const userData = useSelector(store => store.usersReducer.userData)
    const [showProfile, setShowProfile] = useState('show')
    const handleProfile = () => {
        setShowProfile('show')
    }
    const handleProfileClose = () => {
        setShowProfile(null)
    }
    return (
        <motion.div className="account-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}>
            <div className="hero-account">
                <div className="settings-account">
                    <span className="avata-container"><img src={userData.avatar} alt="" className="avatar-account" />
                        <h1>Hi {userData.firstName}!</h1>
                    </span>
                    <h2 onClick={handleProfile} className="settings">Profile</h2>
                    <h2 onClick={handleProfileClose} className="settings">Comments</h2>
                    <h2 onClick={handleProfileClose} className="settings">Favourites itineraries</h2>
                </div>
                {showProfile ? <div className="profile">
                    <h1>Here you can manage your account</h1>
                    <h3>Email: {userData.email}</h3>
                    <h3>Name: {userData.firstName}</h3>
                    <h3>Last name: {userData.lastName}</h3>
                </div> : <div className="profile"><h1>Under Construccion</h1></div>}
            </div>
        </motion.div>

    )
}