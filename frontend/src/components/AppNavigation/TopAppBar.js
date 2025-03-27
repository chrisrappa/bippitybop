import { 
  AppBar, 
  Avatar, 
  Button, 
  Grid, 
  IconButton, 
  Typography 
} from '@mui/material';
import React from 'react'
import { 
  ExpandableTopAppBar,
  StyledToolbar, 
  UserProfilePictureButton 
} from './styled';
import MenuIcon from '@mui/icons-material/Menu';
import ModelVersionSelect from '../../containers/GPTChat/ModelVersionSelect';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';
import { useAuth0 } from '@auth0/auth0-react';

function TopAppBar({
  drawerOpen,
  drawerWidth,
  isMobile,
  handleDrawerToggle,
  navigate,
  loginWithRedirect,
  userInfo,
  theme,
  logout
}) {

  const { isAuthenticated } = useAuth0();
  
  const LoginButtonsResponsive = () => {
    if(isAuthenticated && !isMobile){
      return (
        <Grid
          container
          sx={{
            display: 'flex', 
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingLeft: '0.25rem',
            flex: '1'
          }}
        >
          <Grid 
            item 
            sx={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginRight: '2rem'
            }}
            onClick={() => {
              navigate('/profile/info');
            }}
          >
            
            <UserProfilePictureButton>
              <Avatar alt={userInfo?.name?.split('')[0]} src={userInfo?.picture} />
            </UserProfilePictureButton>
            <Typography sx={{color: 'black', cursor: 'pointer'}}>{userInfo?.name?.split(' ')[0]}</Typography>
          </Grid>
          <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button 
              variant='outlined'
              color='secondary'
              onClick={() => logout({
                logoutParams: { returnTo: window.location.origin } 
              })}
              sx={{
                background: 'linear-gradient(to left, #507CE6 0%, #84A8FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                border: 'none'
              }}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
      )
    };

    if(!isMobile){
      return (
        <Grid 
          sx={{
            display: 'flex', 
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingLeft: '0.25rem',
            flex: '1'
          }}
        >
          <Grid
            sx={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginRight: '1rem'
            }}
          >
            <Button 
              sx={{
                color: 'black', 
                borderColor: 'white', 
                padding: '0.5rem 1.5rem',
                borderRadius: '3rem'
              }} 
              onClick={(e) => {
                gtmTrackButtonClick(e, 'click_login_desktop_header')
                loginWithRedirect()
              }}
            >
              <Typography variant='h7'>
                Log In
              </Typography>
            </Button>
          </Grid>
          <Grid
            sx={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}
          >
            <Button 
              variant='outlined' 
              sx={{
                color: 'white', 
                borderRadius: '3rem',
                padding: '0.5rem 1.5rem',
                background: `linear-gradient(to left, #507CE6 0%, #84A8FF 100%)`
              }} 
              onClick={(e) => {
                gtmTrackButtonClick(e, 'click_register_desktop_header')
                loginWithRedirect({
                  authorizationParams: { screen_hint: "signup" }
                })
              }}
            >
              <Typography variant='h7'>
                Sign Up
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )
    };

    return null;
  };


  return (
    <ExpandableTopAppBar
      position="fixed" 
      open={drawerOpen} 
      drawerWidth={drawerWidth}
      elevation={0} 
      sx={{
        backgroundColor: '#f9fbff', 
      }}
      isAuthenticated={isAuthenticated}
    >
      <StyledToolbar
        disableGutters 
        sx={{backgroundColor: 'transparent'}}
      >
        <Grid 
          item 
          sx={{
            display: isMobile ? 'flex' : 'none', 
            flex: '1', 
            justifyContent: 'center'
          }}
        >
          <IconButton
            color='default'
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              ...(drawerOpen && { display: 'none' }),
              display: isMobile ? 'block' : 'none',
            }}
          >
            <MenuIcon sx={{color: '#84A8FF', fontSize: '2rem'}} />
          </IconButton>
        </Grid>
        <Grid 
          item 
          sx={{
            display: 'flex', 
            flex: isMobile ? '4' : '10', 
            justifyContent: 'space-between', 
            marginRight: '1rem',
            alignItems: 'center'
          }}
        >
          <Grid 
            sx={{
              display: 'flex', 
              flex: isMobile ? '2' : '1', 
              width: '100%', 
              justifyContent: isMobile ? 'flex-end' : 'flex-start'
            }}
          >
            {
              (
                window.location.pathname === '/ai-chat' ||
                window.location.pathname === '/'        ||
                window.location.pathname === '/demo/ai-chat' ||
                window.location.pathname === '/demo/ai-chat/save'
              ) && (
                
                <ModelVersionSelect />

              )
            }
          </Grid>
          <LoginButtonsResponsive />
        </Grid>
      </StyledToolbar>
    </ExpandableTopAppBar>
  );
};

export default TopAppBar;