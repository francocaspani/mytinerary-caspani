import '../stylesheets/card.css';


export default function Card({ city }) {

    return(
    <>
        <div className="card">
            <img src={process.env.PUBLIC_URL+`/assets/img/${city.img}`} alt={city.city} className='img-card' />
            
            <div className="content">
                <h1>{city.city}</h1>
                <h3>{city.country}</h3>
                <button className='button-card'>Details</button>
            </div>
        </div>
    </>
    )
}