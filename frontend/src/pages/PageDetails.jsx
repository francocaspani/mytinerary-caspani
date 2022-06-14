import { useParams, useNavigate } from "react-router-dom"
import data from "../data"
import { useEffect, useState } from "react"
import '../stylesheets/details.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


export default function PageDetails(){
    let navigate = useNavigate()
    const { id } = useParams()
    const [city, setCity] = useState({})

    useEffect(()=>{
        setCity(data)
        let cityFiltered = data.filter(item => item.id === Number(id))

        setCity(cityFiltered[0])
    },[id])

    function handleNavigate(){
        navigate(-1)
    }


    return(
        <>
        <ArrowCircleLeftIcon className="button-back" onClick={handleNavigate} fontSize='large' />
        <div className="body-details">
            <img className="img-details" src={process.env.PUBLIC_URL + `/assets/img/${city.img}`} alt="" />
            <div className="text-details">
                <h1 className="title-details">{city.city}</h1>
                <h3>{city.country}</h3>
            </div>
            
        </div>
        </>



    )
}