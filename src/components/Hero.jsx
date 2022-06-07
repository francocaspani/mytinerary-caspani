import FancyButton from './CallToAction';
import {Link as LinkRouter} from "react-router-dom"

export default function Hero() {
  return (
    <div className='hero-container'>
      <h1>My Tinerary</h1>
      <p>Find your perfect trip, designed by insiders who know and love their cities!</p>
      <LinkRouter to='/underConstruction' ><FancyButton className='button' /></LinkRouter>
    </div>
  )
}