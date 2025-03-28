import React, { useMemo, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Chip, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { updateGPTVersion } from '../../actions/gptChatActions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MobileView from '../../utils/isMobile';
import { 
  SubscribedGPTOptions, 
  BasicGPTOptions, 
  AllGPTOptions, 
  NoAssistantGPTOptions 
} from './constants';
import useCurrentUserInfo from '../../utils/useCurrentUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ModelVersionSelect() {
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const isMobile = MobileView()?.md;
  const userInfo = useCurrentUserInfo();
  const navigate = useNavigate();
  const location = useLocation();

  const userGenCredits = useSelector((state) => state?.userData?.loginInfo?.userCredits);
  const selectedVersion = useSelector((state) => state?.gptChat?.gptVersion);
  const personalAssistantId = useSelector((state) => state?.personalAssistantData?.personalAssistantId);
  const previouslySelectedVersion = localStorage.getItem('AIVersion');

  const [open, setOpen] = useState(false);

  const subscriptionActive = useMemo(() => {
    return userInfo?.subscriptionStatus;
  }, [userInfo]);

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

  useMemo(() => {
    if(userGenCredits < 30){
      dispatch(updateGPTVersion('ChatGPT 3.5', dispatch));
    };

    if(previouslySelectedVersion){
      dispatch(updateGPTVersion(previouslySelectedVersion, dispatch));
    };

    // eslint-disable-next-line
  }, [userGenCredits, previouslySelectedVersion]);

  useMemo(() => {
    if(location?.state?.assistantChat){
      dispatch(updateGPTVersion('My Assistant', dispatch));
      localStorage.setItem('AIVersion', 'My Assistant');
    };

    // eslint-disable-next-line
  }, [location]);

  console.log('personalAssistantId', personalAssistantId)

  const RenderSubscribedAIOptions = () => {
    if(userGenCredits > 30){
      if(!personalAssistantId){
        return (
          <>
            {
              NoAssistantGPTOptions?.map((option, index) => (
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
            <Grid sx={{ position: 'relative' }}>
              <MenuItem
                sx={{width: '100%', display: 'flex'}}
                disabled={!personalAssistantId}
              >
                <Grid sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
                  <img 
                    alt={'Assistant Image'} 
                    src={'https://res.cloudinary.com/djrbfvpit/image/upload/v1733767197/GPTOrg%20Assets/personal_assist_icon_vwzfys.png'} 
                    style={{ width: '40px', height: '40px', marginRight: '1rem'}} 
                  />
                  <Grid>
                    <Typography variant='h6'>
                      My Assistant
                    </Typography>
                    <Typography variant='body2'>
                      Your Personalized Assistant
                    </Typography>
                  </Grid>
                </Grid>
              </MenuItem>
              <Grid style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(3px)' }}>
                <Button 
                  variant='contained'
                  sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                  }}
                  onClick={() => navigate('/assistant')}
                >
                  Create Assistant
                </Button>
              </Grid>
            </Grid>
          </>
        )
      };

      return (
        SubscribedGPTOptions?.map((option, index) => (
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
      )
    } else {
      return (
      <Grid sx={{ position: 'relative' }}>
        {
          SubscribedGPTOptions?.map((option, index) => (
            <MenuItem
              key={option.id}
              selected={option.name === selectedVersion}
              onClick={(event) => handleMenuItemClick(event, option.id)}
              sx={{width: '100%', display: 'flex'}}
              disabled={!subscriptionActive}
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
        <Grid style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(3px)' }}>
          <Button 
            variant='contained'
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              color: 'white',
            }}
            onClick={() => navigate('/subscriptions')}
          >
            Upgrade Plan
          </Button>
        </Grid>
      </Grid>
      )
    };
  };

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
          <Typography variant='h7' sx={{color: 'black'}}>
            {selectedVersion ?? 'ChatGPT 3.5'}
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
          {
            selectedVersion === 'ChatGPT 3.5' ? (
              <AllInclusiveIcon 
                sx={{
                  fontSize: '1rem', 
                  color: 'black', 
                  margin: '0 0.5rem'
                }} 
              />
            ) : (
              <Chip 
                variant='outlined' 
                label={`Credits: ${userGenCredits}`}  
                sx={{ 
                  color: 'black', 
                  marginRight: '0.5rem', 
                  paddingTop: '0'
                }}
              />
            )
          }
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
                  {BasicGPTOptions?.map((option, index) => (
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
                  ))}
                  <RenderSubscribedAIOptions />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
}