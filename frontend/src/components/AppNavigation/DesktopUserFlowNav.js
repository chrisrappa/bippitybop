import React from 'react';
import { 
  Grid,
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { navigationOptions } from "./menuOptions";
import { Link } from 'react-router-dom';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';

function DesktopUserFlowNav({ open }){

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
        }
      </List>
    </Grid>
  )
};

export default DesktopUserFlowNav;