import { Link as LinkRouter } from "react-router-dom"
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import '../stylesheets/footer.css';

export default function Footer(props) {
  return (

    <div className="footer">
      <div className='components-footer'>
        <div className='redes-footer'>
          <a href="https://github.com/francocaspani"><GitHubIcon className='redes-footer' sx={{ m: '1rem', color: 'white' }} /></a>
          <a href="https://www.instagram.com/franco.cspn/"><InstagramIcon className='redes-footer' sx={{ m: '1rem', color: 'white' }} /></a>
          <a href="https://twitter.com/francocasp"><TwitterIcon className='redes-footer' sx={{ m: '1rem', color: 'white' }} /></a>
        </div>
        <img className='logo-footer' src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" />
        <div className='nav-footer'>
          {props.pages && props.pages.map((page, index) => (
            <LinkRouter key={index} className="link" to={page.path}>
              <Button className="button" sx={{ m: 1, color: 'white', display: 'flex' }}>
                {page.name}
              </Button> </LinkRouter>
          ))}
        </div>
      </div>
      <div className='copyright'>© 2022 Copyright - All rights reserved | Designed by Franco Caspani</div>
    </div>
  )
}