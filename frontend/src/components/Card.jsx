import '../stylesheets/card.css';
import { motion } from 'framer-motion'
import { Link as LinkRouter } from "react-router-dom"


export default function Card({ city }) {

  return (
    <>
       <LinkRouter className='link' to={`/cities/${city.id}`}><motion.div className="card2" initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "tween",
          duration: ".1",
          delay: "0"
        }}>
        <h2 className='city-name'>{city.city}</h2>
        <img src={process.env.PUBLIC_URL + `/assets/img/${city.img}`} alt={city.city} className='img-card' />
        <div className="content">
          <h1>{city.city}</h1>
          <h3>{city.country}</h3>
          <LinkRouter to={`/cities/${city.id}`}><button className='button-card'>Details</button></LinkRouter>
        </div>
      </motion.div>
      </LinkRouter>
    </>
  )
}