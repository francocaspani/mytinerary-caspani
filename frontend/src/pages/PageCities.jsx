import '../stylesheets/cities.css';
import { useState, useEffect, useRef } from 'react';
import Map from '../components/Map';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Card from '../components/Card';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
const axios = require('axios');

const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
};





function PageCities() {
  useScrollToTop()
  const myRef = useRef(null)
  const executeScroll = () => window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })

  const [textFilter, setTextFilter] = useState('')
  const [cities, setCities] = useState([])

  const handleTextSearch = (event) => {
    setTextFilter(event.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:4000/api/cities')
      .then(response => {
        let citiesToDisplay = response.data.response.cities.filter(cities => cities.name.toLocaleLowerCase().startsWith(textFilter.trim().toLocaleLowerCase()))
        setCities(citiesToDisplay)
      }
      )
  }, [textFilter])



  return (
    <div className="main-wrapper">
      <h1 className="main-title">Which city would you like to visit?</h1>
      <button className='button-scroll' onClick={executeScroll} ><h1 className="title-scroll">Explore them all!<ArrowCircleDownIcon
        fontSize='large' /></h1></button>
      <div className='container-input'><TextField
        onKeyUp={handleTextSearch}
        sx={{ mx: 1 }} id="search-cities" label="Search" variant="standard" /></div>
      <Map cities={cities} />
      <div className='container-cards' ref={myRef}>
        {cities.length > 0 ? cities.map(city => <Card key={city._id} city={city} />) : <h1>No cities availables</h1>}
      </div>
    </div>
  )
}

export default PageCities;