
import '../stylesheets/App.css';
import Header from './Header';
import bgvideo from '../video/bgvideo.mp4';
import Carousel from './Carousel';
import data from '../data';
import Hero from './Hero';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <div className='main-container'>
        <video src={bgvideo} autoPlay loop muted className='video-bg'>
        </video>
        <Header />
        <Hero />
        <Carousel data = {data}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
