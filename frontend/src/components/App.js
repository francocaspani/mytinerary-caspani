import '../stylesheets/App.css';
import Header from './Header';
import bgvideo from '../video/bgvideo.mp4';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import PageHome from '../pages/PageHome';
import PageUnderConstruction from '../pages/PageUnderConstruction';
import NotFoundPage from '../pages/NotFoundPage';
import PageCities from '../pages/PageCities';
import ScrollToTop from "react-scroll-to-top";



function App() {

  const pages = [{ name: 'Home', path: '/' }, { name: 'Cities', path: '/cities' }]

  return (
    <div className="App">
        <video src={bgvideo} autoPlay loop muted className='video-bg'>
        </video>
        <Header pages={pages} />
        <Routes>
          <Route path='/home' element={<PageHome />} />
          <Route path='/' element={<PageHome />} />
          <Route path='/underConstruction' element={<PageUnderConstruction />} />
          <Route path='/*' element={<NotFoundPage />} />
          <Route path='/cities' element={<PageCities />} />
        </Routes>
        <Footer pages={pages} />
        <ScrollToTop
        smooth
        viewBox="0 0 48 48"
        width='60'
        height='60'
        className='scrollToTop'
        svgPath="M22.5 31.4H25.5V22.3L29.2 26L31.3 23.9L24 16.6L16.7 23.9L18.8 26L22.5 22.3ZM24 44Q19.75 44 16.1 42.475Q12.45 40.95 9.75 38.25Q7.05 35.55 5.525 31.9Q4 28.25 4 24Q4 19.8 5.525 16.15Q7.05 12.5 9.75 9.8Q12.45 7.1 16.1 5.55Q19.75 4 24 4Q28.2 4 31.85 5.55Q35.5 7.1 38.2 9.8Q40.9 12.5 42.45 16.15Q44 19.8 44 24Q44 28.25 42.45 31.9Q40.9 35.55 38.2 38.25Q35.5 40.95 31.85 42.475Q28.2 44 24 44ZM24 41Q31.25 41 36.125 36.125Q41 31.25 41 24Q41 16.75 36.125 11.875Q31.25 7 24 7Q16.75 7 11.875 11.875Q7 16.75 7 24Q7 31.25 11.875 36.125Q16.75 41 24 41ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Z"
      />
    </div>
  );
}

export default App;