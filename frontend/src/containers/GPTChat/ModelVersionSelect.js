import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateGPTVersion } from '../../actions/gptChatActions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MobileView from '../../utils/isMobile';
import { AllGPTOptions } from './constants';

export default function ModelVersionSelect() {
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const isMobile = MobileView()?.md;
  const localStorageVersion = localStorage.getItem('AIVersion');
  const selectedVersion = useSelector((state) => state?.gptChat?.gptVersion);

  const [open, setOpen] = useState(false);

  const handleMenuItemClick = (event, index) => {
    dispatch(
      updateGPTVersion(AllGPTOptions[index].name, dispatch)
    );
    
    localStorage.setItem('AIVersion', AllGPTOptions[index].name);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const selectedVersionObject = AllGPTOptions.find((item) => item?.name === selectedVersion);

  useEffect(() => {
    if(localStorageVersion){
      dispatch(updateGPTVersion(localStorageVersion, dispatch))
    } else {
      dispatch(updateGPTVersion(AllGPTOptions[0].name, dispatch))
    }
  }, [])

  return (
    <Grid 
      id={'ai-provider-demo'}
      sx={{
        display: 'flex', 
        borderRadius: '1rem', 
        padding: '0.25rem',
        backgroundColor: '#EEF2FC',
        width: isMobile ? '17rem' : '20rem', 
        height: '3rem',
        justifyContent: 'space-between'
      }}
    >
      <ButtonGroup
        variant="text"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between', width: '100%'}}
      >
        <Button onClick={handleToggle} sx={{borderRight: 'none!important'}}>
          <img 
            height={'30px'}
            width={'30px'}
            src={selectedVersionObject.icon ?? 'https://res.cloudinary.com/djrbfvpit/image/upload/v1732037023/GPTOrg%20Assets/AI%20Logos/chatgptlogo_ti0zkp.png'} 
            alt={selectedVersionObject.name} 
            style={{ marginRight: '1rem'}}
          />
          <Typography variant='h5' sx={{color: 'black'}}>
            {selectedVersion ?? AllGPTOptions[0].name}
          </Typography>
        </Button>
        <Button
          size="md"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          sx={{borderLeft: 'none'}}
          onClick={handleToggle}
        >
          <KeyboardArrowDownIcon sx={{fontSize: '1rem', color: 'black'}}/>
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper sx={{width: isMobile ? '17rem' : '20rem'}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem sx={{width: '100%'}}>
                  {
                    AllGPTOptions?.map((option, index) => (
                      <MenuItem
                        key={option.id}
                        selected={option.name === selectedVersion}
                        onClick={(event) => handleMenuItemClick(event, option.id)}
                        sx={{width: '100%', display: 'flex'}}
                      >
                        <Grid sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
                          <img alt={`${option.id}`} src={`${option.icon}`} style={{ width: '40px', height: '40px', marginRight: '1rem'}} />
                          <Grid>
                            <Typography variant='h6'>
                              {option.name}
                            </Typography>
                            <Typography variant='body2'>
                              {option.subtext}
                            </Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
};