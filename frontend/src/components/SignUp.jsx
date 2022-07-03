import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from "react-redux";
import '../stylesheets/signup.css';
import usersActions from "../redux/actions/usersActions";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import GoogleAuth from './GoogleAuth';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import SweetAlert2 from 'react-sweetalert2';
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import TwitterLogin from "react-twitter-login";


export default function SignUp() {
    const [countries, setCountries] = useState()
    const [swalProps, setSwalProps] = useState({});
    const [selectedCountry, setSelectedCountry] = useState()
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch()
    const showModal = useSelector(store => store.usersReducer.showModal)

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => setCountries(response.data))
    }, [])

    const countriesSorted = countries?.map(country => country.name.common).sort()

    useEffect(() => {
        setSwalProps({
            show: false
        })
    }, [showModal])

    const handleSubmit = async (event) => {
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
        const res = await dispatch(usersActions.signUpUser(userData))

        if (res.data.from === 'validator') {
            res.data.message.map((message, index) => toast.error(message.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 7000,
                delay: Number(`${index}000`)
            }))
        } else {
            Swal.fire({
                title: res.data.message,
                width: 600,
                padding: '3em',
                color: '#ffff',
                confirmButtonColor: '#212121',
                background: '#000000'
            })
        }
    }

    function googleModal() {
        setSwalProps({
            show: true,
            title: 'Select your country of residence',
            background: '#000000',
            confirmButtonColor: '#212121',
            color: '#ffff',
            heightAuto: 'false'
        })
    }

    const handleSelect = (event) => {
        setSelectedCountry(event.target.value)
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const authHandler = (err, data) => {
        console.log(err, data);
    };
    const CONSUMER_KEY = 'Od9oFefB3FTlubzmSqfyAZzQM'
    const CONSUMER_SECRET = 'SMdN7HSaSCICJWU7VzffHLuPE0u7C2Jz1DUEG7jIPbjurV8OEH'
    return (
        <>
            <div className="extern-signup">
                <p>Sign in with:</p>
                <div className='signup-icons'><span><FacebookIcon /></span>
                    <span onClick={googleModal}><GoogleIcon />
                        <SweetAlert2 {...swalProps}
                            willClose={() => {
                                setSwalProps({
                                    show: false,
                                })
                            }}
                        >
                            <div className='google-modal'>
                                <select onChange={handleSelect} className='select-modal' name="country" id="country">
                                    {countriesSorted?.map((everycountry, index) => <option key={index} value={everycountry}>{everycountry}</option>)}
                                </select>
                                {selectedCountry && <span><GoogleAuth country={selectedCountry} /></span>
                                }
                            </div>
                        </SweetAlert2>
                    </span>
                    <span><TwitterIcon />
                        <TwitterLogin
                            authCallback={authHandler}
                            consumerKey={CONSUMER_KEY}
                            consumerSecret={CONSUMER_SECRET}
                        />
                    </span></div>
            </div>
            <div className='form'>
                <p>or create an account</p>
                <form onSubmit={handleSubmit}>
                    <span className='input'>
                        <input type="text" name="name" placeholder="First Name*" required />
                    </span>
                    <span className='input'>
                        <input type="text" name="lastName" placeholder="Last Name" />
                    </span>
                    <span className='input'>
                        <input type="email" name="email" id="email" placeholder="Email*" required />
                    </span>
                    <span className='input'>
                        <input type="password" name="password" id="password" placeholder="Password*" required />
                        <InfoIcon
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            className='info-password' sx={{ fontSize: 'large' }} />
                        <Popover
                            id="mouse-over-popover"
                            sx={{
                                pointerEvents: 'none',
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <p className='info-password-text'>Password must include an uppercase,<br /> a lowercase, and a number.</p>
                        </Popover>
                    </span>
                    <span className='input'>
                        <input type="text" name="avatar" id="avatar" placeholder="Profile Pic URL*" required />
                    </span>
                    <span className='input'>
                        <select name="country" id="country" placeholder='Country'>
                            {countriesSorted?.map((everycountry, index) => <option key={index} value={everycountry}>{everycountry}</option>)}
                        </select>
                    </span>
                    <button className='full-rounded' type="submit">
                        <span>Sign Up</span>
                        <div className="border full-rounded"></div>
                    </button>
                </form>
            </div>
        </>
    )
}