import { 
  Grid, 
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import React from 'react'
import { 
  ExpandableTopAppBar,
  StyledToolbar, 
} from './styled';
import MenuIcon from '@mui/icons-material/Menu';
import ModelVersionSelect from '../../containers/GPTChat/ModelVersionSelect';

function TopAppBar({
  drawerOpen,
  drawerWidth,
  handleDrawerToggle
}) {

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <ExpandableTopAppBar
      position="fixed" 
      open={drawerOpen} 
      drawerWidth={drawerWidth}
      elevation={5} 
      sx={{
        backgroundColor: '#f9fbff', 
      }}
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
            <MenuIcon sx={{color: '#52985b', fontSize: '2rem'}} />
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
                window.location.pathname === '/'       
              ) && (
                <Grid display={'flex'} alignItems={'center'}>
                  {
                    !isMobile && (
                      <Typography 
                        variant='h5' 
                        sx={{ 
                          marginRight: '1rem',
                          marginLeft: '1rem',
                          color: '#818181'
                        }}
                      >
                        Select AI: 
                      </Typography>
                    )
                  }
                  <ModelVersionSelect />
                </Grid>
              )
            }
          </Grid>
        </Grid>
      </StyledToolbar>
    </ExpandableTopAppBar>
  );
};

export default TopAppBar;