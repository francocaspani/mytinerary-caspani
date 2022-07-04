import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { motion } from 'framer-motion';

const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0  , behavior: 'smooth' });
  }, [location]);
};

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  background: '#000000',
  color: '#ffff',
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function PageHome({verification}) {
  useScrollToTop()
  if  (verification){
    Toast.fire({
      icon: 'success',
      title: 'Email verified successfully, now you can log in'
    })
  }
  const cities = useSelector(store => store.citiesReducer.cities)

  return (
    <motion.div className='body-home'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}>
      <Hero />
      <Carousel data={cities} />
    </motion.div>
  )
}


export default PageHome