import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateGPTVersion } from '../../actions/gptChatActions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MobileView from '../../utils/isMobile';
import { AIPalOptions } from './constants';

export default function AIPalSwitch() {
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const isMobile = MobileView()?.md;
  const localStorageVersion = JSON.parse(localStorage.getItem('AIVersion'));
  const selectedVersion = useSelector((state) => state?.gptChat?.gptVersion);

  const [open, setOpen] = useState(false);

  const handleMenuItemClick = (event, index) => {
    dispatch(
      updateGPTVersion(AIPalOptions[index], dispatch)
    );
    
    localStorage.setItem('AIVersion', JSON.stringify(AIPalOptions[index]));
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

  useEffect(() => {
    if(localStorageVersion){
      dispatch(updateGPTVersion(localStorageVersion, dispatch))
    } else {
      dispatch(updateGPTVersion(AIPalOptions[0], dispatch))
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
            src={selectedVersion?.icon ?? 'https://res.cloudinary.com/djrbfvpit/image/upload/v1732037023/GPTOrg%20Assets/AI%20Logos/chatgptlogo_ti0zkp.png'} 
            alt={selectedVersion.name} 
            style={{ marginRight: '1rem'}}
          />
          <Typography variant='h5' sx={{color: 'black'}}>
            {selectedVersion?.name ?? AIPalOptions[0].name}
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
          width: '70dvw',
        }}
        placement="bottom-start"
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
                placement === 'bottom' ? 'left top' : 'left bottom',
            }}
          >
            <Paper
              sx={{
                width: '70dvw',
                maxHeight: '70dvh',
                overflowY: 'auto',
                padding: '1rem',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(3, 1fr)',
                    },
                    gridAutoRows: 'minmax(100px, auto)',
                    gap: '1rem',
                  }}
                >
                  {AIPalOptions?.map((option, index) => (
                    <Grid
                      item
                      key={option.id}
                      onClick={(event) => handleMenuItemClick(event, option.id)}
                      sx={{
                        border:
                          option.name === selectedVersion?.name
                            ? '2px solid #1976d2'
                            : '1px solid #ccc',
                        borderRadius: '0.5rem',
                        padding: '0.5rem',
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        },
                      }}
                    >
                      <Grid item flex={'1'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <img
                          alt={`${option.id}`}
                          src={`${option.icon}`}
                          style={{
                            width: '40px',
                            height: '40px',
                            marginRight: '0.5rem',
                          }}
                        />
                      </Grid>
                      <Grid item flex={'3'}>
                        <Typography variant="h6" noWrap>
                          {option.name}
                        </Typography>
                        <Typography variant="body2" noWrap>
                          {option.subtext}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
};