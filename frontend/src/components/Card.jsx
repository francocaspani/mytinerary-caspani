import '../stylesheets/card.css';
import { motion } from 'framer-motion'


export default function Card({ city }) {

    return(
    <>
        <motion.div className="card" initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "tween",
        duration: ".1",
        delay: "0"
      }}>
            <img src={process.env.PUBLIC_URL+`/assets/img/${city.img}`} alt={city.city} className='img-card' />
            <div className="content">
                <h1>{city.city}</h1>
                <h3>{city.country}</h3>
                <button className='button-card'>Details</button>
            </div>
        </motion.div>
    </>
    )
}