import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const axios = require('axios');

const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0  , behavior: 'smooth' });
  }, [location]);
};


export default function PageHome() {
  useScrollToTop()
  const [citiesApi, setCitiesApi] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4000/api/cities')
      .then(response => setCitiesApi(response.data.response.cities))
  },[])



  return (
    <div className='body-home'>
      <Hero />
      <Carousel data={citiesApi} />
    </div>
  )
}