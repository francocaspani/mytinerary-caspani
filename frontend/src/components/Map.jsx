import { Link as LinkRouter } from "react-router-dom"



export default function Map({ cities }) {

    return (
        <div className="image-wrapper">
            {cities.map(item => (
                <div key={item._id} className="pin-wrapper" style={{ left: `${item.left}%`, bottom: `${item.bottom}%` }}>
                    <div className="pin">
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/assets/img/${item.img}`} alt={item.name} className='card-image' />
                            <div>
                                <div className="card-title">{item.name}</div>
                                <LinkRouter to={`/cities/${item._id}`}><button className="card-button">Know more</button></LinkRouter>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <img className="main-image" src={process.env.PUBLIC_URL + `/assets/img/map.png`} alt="World map" />
        </div>
    )
}