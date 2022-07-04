import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import '../stylesheets/details.css';
import citiesActions from '../redux/actions/citiesActions';
import { useDispatch, useSelector } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Itinerary from "../components/Itinerary";
import NonItinerary from "../components/NonItinerary";
import { motion } from "framer-motion";



function PageDetails() {

    let navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(citiesActions.getOneCity(id))
        dispatch(itinerariesActions.getItinerariesByCity(id))
        // eslint-disable-next-line
    }, [id])
    const itinerariesByCity = useSelector(store => store.itinerariesReducer.itinerariesByCity)
    const city = useSelector(store => store.citiesReducer.city)

    function handleNavigate() {
        navigate(-1)
    }

    return (
        <>
            {city &&
                <>
                    <button onClick={handleNavigate} className="button-back"><svg className="button-back" xmlns="http://www.w3.org/2000/svg" height="60" width="60"><path d="M24 31.3 26.1 29.2 22.4 25.5H31.5V22.5H22.4L26.1 18.8L24 16.7L16.7 24ZM24 44Q19.75 44 16.1 42.475Q12.45 40.95 9.75 38.25Q7.05 35.55 5.525 31.9Q4 28.25 4 24Q4 19.8 5.525 16.15Q7.05 12.5 9.75 9.8Q12.45 7.1 16.1 5.55Q19.75 4 24 4Q28.2 4 31.85 5.55Q35.5 7.1 38.2 9.8Q40.9 12.5 42.45 16.15Q44 19.8 44 24Q44 28.25 42.45 31.9Q40.9 35.55 38.2 38.25Q35.5 40.95 31.85 42.475Q28.2 44 24 44ZM24 41Q31.25 41 36.125 36.125Q41 31.25 41 24Q41 16.75 36.125 11.875Q31.25 7 24 7Q16.75 7 11.875 11.875Q7 16.75 7 24Q7 31.25 11.875 36.125Q16.75 41 24 41ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Z" /></svg></button>
                    <motion.div className="body-details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <img className="img-details" src={process.env.PUBLIC_URL + `/assets/img/${city.img}`} alt={city.name} />
                        <div className="text-details">
                            <h1 className="title-details">{city.name}</h1>
                            <h3>{city.country}</h3>
                            {itinerariesByCity.length > 0 ? <Itinerary /> : <NonItinerary city={city.name} />}
                        </div>
                    </motion.div>
                </>}

        </>

    )
}

export default PageDetails;