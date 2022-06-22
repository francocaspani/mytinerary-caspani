import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';


const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0  , behavior: 'smooth' });
  }, [location]);
};


function PageHome(props) {
  useScrollToTop()
  // const [cities, setCities] = useState()

  // useEffect(()=>{
  //   axios.get('http://localhost:4000/api/cities')
  //     .then(response => setCitiesApi(response.data.response.cities))
  // },[])

  const cities = props.cities


  return (
    <div className='body-home'>
      <Hero />
      <Carousel data={cities} />
    </div>
  )
}


const mapStateToProps = (state =>{
  return {
    cities: state.citiesReducer.cities
  }
})

export default connect(mapStateToProps, null)(PageHome)