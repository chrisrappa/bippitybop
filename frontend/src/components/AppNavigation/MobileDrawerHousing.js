import React from 'react';
import { 
  Drawer, 
  IconButton,
  ListItem,
  Typography,
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
          <Typography
            variant="h5" 
            component="div" 
            sx={{ color: 'white', fontFamily: 'Mogra' }}
          >
            bippityblop
          </Typography>
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