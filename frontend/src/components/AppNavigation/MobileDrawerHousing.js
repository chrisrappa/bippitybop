import React from 'react';
import { 
  Drawer, 
  IconButton,
  ListItem,
  useTheme
} from '@mui/material';
import { DrawerHeader, PrimaryTypography } from './styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MobileDrawer from './MobileDrawer';

function MobileDrawerHousing({
  container,
  handleDrawerToggle,
  open,
  setOpen,
  drawerWidth
}) {

  const theme = useTheme();
  
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
        <ListItem>
          <img 
            src='https://res.cloudinary.com/djrbfvpit/image/upload/v1709418293/mzr2h6c092lo5j4lnixv.png' 
            alt='logo'
            height='25px' 
            width='25px'
            style={{ marginRight: '0.5rem' }}
          />
          <PrimaryTypography
            variant="body2" 
            // noWrap 
            component="div" 
            sx={{ color: 'white' }}
          >
            GPT Organized
          </PrimaryTypography>
        </ListItem>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: '#C6C6C6'}} /> : <ChevronLeftIcon sx={{color: '#C6C6C6'}} />}
        </IconButton>
      </DrawerHeader>
      <MobileDrawer open={open} setOpen={setOpen} />

    </Drawer>
  );
};

export default MobileDrawerHousing;