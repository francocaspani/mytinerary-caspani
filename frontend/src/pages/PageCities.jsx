import data from '../data';
import '../stylesheets/cities.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Card from '../components/Card';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Link as LinkRouter } from "react-router-dom"


const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
};

const useScrollTo = () => {
  window.scrollTo({ top: 1200, behavior: 'smooth' });
};



function PageCities() {
  useScrollToTop()
  const [textFilter, setTextFilter] = useState('')
  const [cities, setCities] = useState([data])
  const handleTextSearch = (event) => {
    setTextFilter(event.target.value)
  }

  useEffect(() => {
    const citiesToDisplay = data.filter(cities => cities.city.toLocaleLowerCase().startsWith(textFilter.trim().toLocaleLowerCase()))
    setCities(citiesToDisplay)

  }, [textFilter])



  return (
    <div className="main-wrapper">
      <h1 className="main-title">Which city would you like to visit?</h1>
      <button className='button-scroll' onClick={useScrollTo} ><h1 className="title-scroll">Explore them all!<ArrowCircleDownIcon
        fontSize='large' /></h1></button>
      <div className='container-input'><TextField
        onKeyUp={handleTextSearch}
        sx={{ mx: 1 }} id="search-cities" label="Search" variant="standard" /></div>
      <div className="image-wrapper">
        {cities.map(item => (
          <div key={item.id} className="pin-wrapper" style={{ left: `${item.left}%`, bottom: `${item.bottom}%` }}>
            <div className="pin">
              <div className="card">
                <img src={process.env.PUBLIC_URL + `/assets/img/${item.img}`} alt={item.city} className='card-image'/>
                <div>
                  <div className="card-title">{item.city}</div>
                  <LinkRouter to={`/cities/${item.id}`}><button className="card-button">Know more</button></LinkRouter>
                </div>
              </div>
            </div>
          </div>
        ))}
        <img className="main-image" src={process.env.PUBLIC_URL + `/assets/img/map.png`} alt="World map" />
      </div>

      <div className='container-cards'>
        {cities.length > 0 ? cities.map(city => <Card key={city.id} city={city} />) : <h1>No cities availables</h1>}


      </div>
    </div>
  )
}

export default PageCities;