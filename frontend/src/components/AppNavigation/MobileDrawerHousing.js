import React from 'react';
import { 
  Drawer, 
  IconButton,
  useTheme
} from '@mui/material';
import { DrawerHeader } from './styled';
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
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: '#C6C6C6'}} /> : <ChevronLeftIcon sx={{color: '#C6C6C6'}} />}
        </IconButton>
      </DrawerHeader>
      <MobileDrawer open={open} setOpen={setOpen} />

    </Drawer>
  );
};

export default MobileDrawerHousing;