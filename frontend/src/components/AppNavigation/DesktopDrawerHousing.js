import React from 'react'
import { DesktopDrawer, DesktopDrawerHeader, PrimaryTypography } from './styled';
import { Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
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
                justifyContent: 'flex-start',
                marginLeft: '1rem'
              }}
            >
              <Typography
                variant="h5" 
                component="div" 
                sx={{ color: 'white', fontFamily: 'Mogra' }}
              >
                bippitybop
              </Typography>
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