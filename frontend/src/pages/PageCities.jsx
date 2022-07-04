import '../stylesheets/cities.css';
import { useState, useEffect, useRef } from 'react';
import Map from '../components/Map';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Card from '../components/Card';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import citiesActions from '../redux/actions/citiesActions';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';



const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
};


function PageCities(props) {
  useScrollToTop()
  const myRef = useRef(null)
  const executeScroll = () => window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })

  const [textFilter, setTextFilter] = useState('')

  const handleTextSearch = (event) => {
    setTextFilter(event.target.value)
  }
  useEffect(() => {
    props.filterCities(textFilter)
    // eslint-disable-next-line
  }, [textFilter])

  return (
    <motion.div className="main-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <h1 className="main-title">Which city would you like to visit?</h1>
      <button className='custom-btn btn-12' onClick={executeScroll} ><span><h1>Explore them all!</h1></span><span><ArrowCircleDownIcon
        fontSize='large' /></span></button>
      <div className='container-input'><TextField
        onKeyUp={handleTextSearch}
        sx={{ mx: 1 }} id="search-cities" label="Search" variant="standard" /></div>
      <Map cities={props.citiesFiltered} />
      <div className='container-cards' ref={myRef}>
        {props.citiesFiltered.length > 0 ? props.citiesFiltered.map(city => <Card key={city._id} city={city} />) : <h1>No cities availables</h1>}
      </div>
    </motion.div>
  )
}

const mapDispatchToProps = {
  filterCities: citiesActions.filterCities
}

const mapStateToProps = (state => {
  return {
    cities: state.citiesReducer.cities,
    citiesFiltered: state.citiesReducer.citiesFiltered
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PageCities);