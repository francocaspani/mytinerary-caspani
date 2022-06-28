import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import '../stylesheets/header.css'
import { Link as LinkRouter } from "react-router-dom"

const settings = [{ name: 'Sign Up', path: '/signup' }, { name: 'Log In', path: '/login' }, { name: 'Logout', path: '/underConstruction' }];

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className='header' position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: 'none' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <LinkRouter to='/' ><Box component="span" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}><img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="Logo" className='logo' /></Box></LinkRouter>
          <Typography
            className='font-header'
            variant="h6"
            noWrap
            component="a"
            sx={{
              p: 2,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MY TINERARY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {props.pages && props.pages.map((page, index) => (
                <LinkRouter key={index} className='link' to={page.path} >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography className='font-header' textAlign="center" sx={{ color: 'black' }}>{page.name} </Typography>
                  </MenuItem>
                </LinkRouter>

              ))}
            </Menu>
          </Box>
          <Box component="span" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 1 }}><img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="Logo" className='logo' /></Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {props.pages && props.pages.map((page, index) => (
              <LinkRouter key={index} className='link' to={page.path}><Button className='button'
                onClick={handleCloseNavMenu}
                sx={{ m: 3, color: 'white', display: 'block', fontSize: '', border: 'solid' }}
              >
                {page.name}
              </Button> </LinkRouter>

            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <LinkRouter key={index} className='link' to={setting.path}><MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ color: 'black' }} textAlign="center">{setting.name}</Typography>
                </MenuItem></LinkRouter>

              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
