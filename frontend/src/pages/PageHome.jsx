import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0  , behavior: 'smooth' });
  }, [location]);
};


function PageHome() {
  useScrollToTop()

  const cities = useSelector(store => store.citiesReducer.cities)

  return (
    <div className='body-home'>
      <Hero />
      <Carousel data={cities} />
    </div>
  )
}


export default PageHome