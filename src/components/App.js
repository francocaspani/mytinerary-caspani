
import '../stylesheets/App.css';
import Header from './Header';
import bgvideo from '../video/bgvideo.mp4';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import PageHome from '../pages/PageHome';
import PageUnderConstruction from '../pages/PageUnderConstruction';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <div className='main-container'>
        <video src={bgvideo} autoPlay loop muted className='video-bg'>
        </video>
        <Header />
        <Routes>
          <Route path='/home' element={<PageHome />} />
          <Route path='/' element={<PageHome />} />
          <Route path='/underConstruction' element={<PageUnderConstruction />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
