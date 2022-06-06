
import '../stylesheets/App.css';
import Header2 from './Header';
import bgvideo from '../video/bgvideo.mp4';
import Carousel from './Carousel';
import data from '../data';

function App() {
  return (
    <div className="App">
      <div className='main-container'>
        <video src={bgvideo} autoPlay loop muted className='video-bg'>
        </video>
        <Header2 />
        <div className='hero-container'>
          <h1>My Tinerary</h1>
          <p>Find your perfect trip, designed by insiders who know and love their cities!</p>
        </div>
      
      </div>
        <div className='carousel-container'>
        <Carousel data = {data}/>
      </div>
    </div>
  );
}

export default App;
