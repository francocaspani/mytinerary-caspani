import data from '../data';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';



export default function PageHome() {
    return (
        <>
        <Hero />
        <Carousel data = {data}/>
        </>
    )
}