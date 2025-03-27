import React from 'react';
import { 
  Chip,
  Grid,
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { navigationOptions, trialNavigationOptions } from "./menuOptions";
import { Link, useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';

function DesktopUserFlowNav({
  open,
  isAuthenticated,
  userInfo
}){

  const navigate = useNavigate();

  const RenderSubscriptionTier = () => {

    switch(userInfo?.stripeProductId){
      case null || undefined :{
        return (
          <Chip 
            label="BASIC FREE" 
            color="primary"
            sx={{ padding: '0 2rem'}} 
            variant='outlined'
            onClick={() => navigate('/subscriptions')}
          />
        )
      }
      case `${process.env.REACT_APP_SUB_TIER_PLUS}`:{
        return (
          <Chip 
            label="PLUS MEMBER" 
            color="primary"
            variant='outlined'
            sx={{ padding: '0 2rem'}} 
            onClick={() => navigate('/subscriptions')}
          />
        )
      };
      case `${process.env.REACT_APP_SUB_TIER_PREMIUM}`:{
        return (
          <Chip 
            label="PREMIUM MEMBER" 
            color="primary"
            sx={{ padding: '0 1rem'}} 
            variant='outlined'
            onClick={() => navigate('/subscriptions')}
          />
        )
      };
      default: return null;
    }
  };

  const renderListItemButton = (option) => {
    const isExternal = option.link.startsWith('http');
    const ListItemComponent = isExternal ? 'a' : Link;

    return (
      <ListItemButton
        disableGutters
        component={ListItemComponent}
        to={isExternal ? undefined : option.link}
        href={isExternal ? option.link : undefined}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        sx={{
          height: '5rem',
          width: '5rem',
          flex: '1',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
        key={option.id}
        onClick={(e) => gtmTrackButtonClick(e, option?.analyticId)}
      >
        <ListItemIcon
          sx={{
            justifyContent: 'center',
            width: !open && '100%',
          }}
        >
          {option.icon}
        </ListItemIcon>
        <ListItemText
          primary={option.name}
          sx={{
            opacity: open ? 1 : 0,
            flex: open ? '2' : '0',
            color: 'white'
          }}
        />
      </ListItemButton>
    );
  };


  return (
    <Grid 
      container 
      sx={{
        display: 'flex', 
        width: '100%', 
        justifyContent: 'space-between', 
        alignItem: 'center',
        height: '85dvh'
      }}
    >
      <List 
        sx={{
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start', 
          alignItems: 'center',
          width: '100%',
        }}
      >
        {
          isAuthenticated ? 
            navigationOptions.map((option, index) => (
            <ListItem 
              key={option?.id} 
              disablePadding 
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '4rem', 
                width: '100%!important'
              }}

            >
              <Tooltip title={option.name} placement='right'>
                {renderListItemButton(option)}
              </Tooltip>
            </ListItem>
          ))

          :

          trialNavigationOptions.map((option, index) => (
            <ListItem 
              key={option?.id} 
              disablePadding 
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '4rem', 
                width: '100%!important'
              }}
            >
              <Tooltip title={option.name} placement='right'>
                {renderListItemButton(option)}
              </Tooltip>
            </ListItem>
          ))
        }
        {
					userInfo?.isAdmin && (
            <ListItem 
              key={100} 
              disablePadding 
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '4rem', 
                width: '100%!important'
              }}
            >
              <Tooltip title={'Admin'} placement='right'>
                <ListItemButton 
                  disableGutters 
                  component={Link}
                  to={'/admin'}
                  sx={{
                    height: '5rem',
                    width: '5rem', 
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                    <ListItemIcon 
                      sx={{
                        justifyContent: 'center', 
                        width: !open && '100%',
                        color: '#C6C6C6'
                      }}
                    >
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary = {'Admin'}
                      sx = {{
                        opacity: open ? 1 : 0,
                        flex: open ? '2' : '0',
                      }}
                    />
                
                </ListItemButton>
              </Tooltip>
            </ListItem>
					)
				}
      </List>
      <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}> 
        {
          open && (
            <RenderSubscriptionTier />
          )
        }
      </Grid>
    </Grid>
  )
};

export default DesktopUserFlowNav;