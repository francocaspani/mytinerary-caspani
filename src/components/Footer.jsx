import { Link as LinkRouter } from "react-router-dom"
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import '../stylesheets/footer.css';

const pages = [{ name: 'Home', path: '/' }, { name: 'Cities', path: '/underConstruction' }]
export default function Footer() {
  return (
    
    <div className="footer">
      <div className='components-footer'>
        <div className='redes-footer'>
          <GitHubIcon className='redes-footer' sx={{ m: '1rem', color: 'white' }} />
          <InstagramIcon className='redes-footer' sx={{ m: '1rem', color: 'white' }} />
          <TwitterIcon className='redes-footer' sx={{ m: '1rem', color: 'white' }} />
        </div>
        <img className='logo-footer' src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" />

        <div className='nav-footer'>
          {pages.map((page) => (
            <LinkRouter className="link" to={page.path}>
              <Button className="button" key={page} sx={{ m: 1, color: 'white', display: 'flex', border: 'solid' }}>
                {page.name}
              </Button> </LinkRouter>
          ))}
        </div>
      </div>
      <div className='copyright'>© 2022 Copyright - All rights reserved | Designed by Franco Caspani</div>
    </div>
  )
}