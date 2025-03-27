import React from 'react';
import { 
  Avatar, 
  Button,
  Drawer, 
  IconButton,
  ListItem, 
  ListItemButton, 
  Typography 
} from '@mui/material';
import { DrawerHeader, UserProfilePictureButton } from './styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MobileDrawer from './MobileDrawer';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';

function MobileDrawerHousing({
  container,
  handleDrawerToggle,
  open,
  theme,
  isAuthenticated,
  navigate,
  setOpen,
  userInfo,
  logout,
  loginWithRedirect,
  drawerWidth
}) {
  
  return (
    <Drawer
      container={container}
      variant="persistent"
      anchor='left'
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: drawerWidth, 
          backgroundColor: `${theme.toolbars.mobileNav.backgroundColor}` ,
          zIndex: '1500'
        },
      }}
    >
      <DrawerHeader>
        {
          isAuthenticated ? (
            <ListItem
              sx={{
                display: 'flex', 
                justifyContent: 'flex-start',
                paddingLeft: '0.25rem',
              }}
            >
              <UserProfilePictureButton
                onClick={() => {
                  navigate('/profile/info');
                  setOpen(false)
                }}
              >
                <Avatar alt={userInfo?.name?.split('')[0]} src={userInfo?.picture} />
              </UserProfilePictureButton>
              <Typography sx={{color: '#C6C6C6'}}>{userInfo?.name?.split(' ')[0]}</Typography>
            </ListItem>
          ) : (
            <ListItem>
              <ListItemButton sx={{paddingLeft: '0'}}>
                <Button
                  variant='outlined' 
                  sx={{
                    color: 'white', 
                    borderColor: 'white', 
                    backgroundColor: `${theme.palette.primary.main}`,
                    justifyContent: 'flex-start',
                    padding: '0.25rem 1.75rem',
                    fontSize: '1.25rem'
                  }} 
                  onClick={(e) => {
                    gtmTrackButtonClick(e, 'click_login_mobile_sidebar');
                    loginWithRedirect();
                  }}
                >
                  Log In
                </Button>
              </ListItemButton>
            </ListItem>
          )
        }
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: '#C6C6C6'}} /> : <ChevronLeftIcon sx={{color: '#C6C6C6'}} />}
        </IconButton>
      </DrawerHeader>
      <MobileDrawer
        open={open} 
        setOpen={setOpen} 
        logout={logout}
        isAuthenticated={isAuthenticated}
        isAdmin={userInfo?.isAdmin}
        loginWithRedirect={loginWithRedirect}
      />

    </Drawer>
  );
};

export default MobileDrawerHousing;