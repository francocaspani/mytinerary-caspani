import data from '../data';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
};


export default function PageHome() {
  useScrollToTop()
  return (
    <>
      <Hero />
      <Carousel data={data} />
    </>
  )
}