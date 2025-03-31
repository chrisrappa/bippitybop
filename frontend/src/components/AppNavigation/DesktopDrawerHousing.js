import React from 'react'
import { DesktopDrawer, DesktopDrawerHeader, PrimaryTypography } from './styled';
import { Divider, Grid, IconButton, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DesktopUserFlowNav from './DesktopUserFlowNav';

function DesktopDrawerHousing({
  desktopDrawerOpen,
  handleDrawerToggle,
  drawerWidth
}) {

  const theme = useTheme();
  
  return (
    <DesktopDrawer
      variant="permanent"
      open={desktopDrawerOpen}
      anchor='left'
      bgColor={`${theme.toolbars.desktopNav.backgroundColor}`}
    >
      <DesktopDrawerHeader>
        {
          desktopDrawerOpen && (
            <Grid
              sx={{
                display: 'flex', 
                flex: '1', 
                width: '100%', 
                alignItems: 'center', 
                justifyContent: 'flex-end',
              }}
            >
              
              <img 
                src='https://res.cloudinary.com/djrbfvpit/image/upload/v1709418293/mzr2h6c092lo5j4lnixv.png' 
                alt='logo'
                height='25px' 
                width='25px'
                style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
              />
              <PrimaryTypography
                variant="body2" 
                // noWrap 
                component="div" 
                sx={{ color: 'white' }}
              >
                GPT Organized
              </PrimaryTypography>
            </Grid>
          )
        }
        {desktopDrawerOpen ? (
            <IconButton onClick={handleDrawerToggle} sx={{}}>
              <ChevronLeftIcon sx={{color: '#C6C6C6'}} />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerToggle}>
              <ChevronRightIcon sx={{color: '#C6C6C6'}} />
            </IconButton>
          )
        }
      </DesktopDrawerHeader>
      <Divider />
      <DesktopUserFlowNav open={desktopDrawerOpen} />
    </DesktopDrawer>
  )
}

export default DesktopDrawerHousing;