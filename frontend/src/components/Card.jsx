import '../stylesheets/card.css';
import { motion } from 'framer-motion'
import { Link as LinkRouter } from "react-router-dom"


export default function Card({ city }) {

  return (
    <>
      <motion.div className="card2" initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "tween",
          duration: ".1",
          delay: "0"
        }}>
        <h2 className='city-name'>{city.name}</h2>
        <img src={process.env.PUBLIC_URL + `/assets/img/${city.img}`} alt={city.name} className='img-card' />
        <div className="content">
          <h1>{city.name}</h1>
          <h3>{city.country}</h3>
          <LinkRouter to={`/cities/${city._id}`}><button className='button-card'>Know more</button></LinkRouter>
        </div>
      </motion.div>
    </>
  )
}