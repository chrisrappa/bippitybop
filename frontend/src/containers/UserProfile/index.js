import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
  AvatarContainer, 
  CustomTextField, 
  InformationCard, 
  MainContentArea,   
  MainContentAreaChildGrid,   
  TabsAndPanelsParentBox 
} from './styled';
import { 
  Avatar, 
  Button, 
  Card, 
  CardContent, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography 
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { deleteUser, editUsernameEmail } from '../../actions/userActions';
import getUserFilesNumber from '../../helpers/getUniqueFolders';
import { useAuth0 } from '@auth0/auth0-react';
import useCurrentUserInfo from '../../utils/useCurrentUserInfo';
import { useNavigate } from 'react-router-dom';
import subscriptionPlans from '../../consts/subscriptionPlans';
import CheckIcon from '@mui/icons-material/Check';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

function UserProfile() {

  const theme = useTheme();
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const userInfo = useCurrentUserInfo();
  const navigate = useNavigate();

  const currentSubscription = userInfo?.stripeProductId;
  const currentPlanObject = subscriptionPlans.filter(
    (plan) => currentSubscription === plan.subscriptionProductId
  )[0] ?? subscriptionPlans[0];

  const {
    title,
    price,
    features
  } = currentPlanObject;
  
  const userSavedMessages = useSelector((state) => state?.userData?.loginInfo?.gptMessages);
  const ownedMessageFolders = useSelector((state) => state.gptChat.ownedFolders);

  const [userEmail, setUserEmail] = useState(userInfo?.email);
  const [username, setUsername] = useState(userInfo?.username);
  const [deleteProfleOpen, setDeleteProfileOpen] = useState(false);

  const handleClose = () => {
    setDeleteProfileOpen(false);
  };

  const handleUpdate = () => {
    dispatch(
      editUsernameEmail({ 
        userId: userInfo?.user_id, 
        username: username, 
        email: userEmail
      }, dispatch)
    );
  };

  const handleDeleteProfile = () => {
    dispatch(deleteUser(userInfo?.user_id, dispatch));
    logout({
      logoutParams: { returnTo: window.location.origin } 
    });
  };

  const getUserFoldersLimit = () => {
    if(!currentPlanObject?.subscriptionProductId){
      return '10';
    };

    if(currentPlanObject?.subscriptionProductId === process.env.REACT_APP_SUB_TIER_PLUS){
      return '50';
    };

    if(currentPlanObject?.subscriptionProductId === process.env.REACT_APP_SUB_TIER_PREMIUM){
      return (
        <AllInclusiveIcon 
          sx={{
            fontSize: '1rem', 
            color: 'black', 
            margin: '0 0.5rem'
          }} 
        />
      );
    };
  };

  return (
    <MainContentArea elevation={0}>
      <MainContentAreaChildGrid container >
        <AvatarContainer container>
          <Avatar sx={{margin: '1rem'}} alt={userInfo?.name} src={userInfo?.picture} />
          <Typography sx={{color: 'gray'}}>{userInfo?.name}</Typography>
        </AvatarContainer>
        <TabsAndPanelsParentBox>
          <InformationCard elevation={5}>
            <Grid 
              sx={{display: 'flex', flexDirection: 'column', flex: '2', height: 'fit-content', width: '100%'}}>
              <CustomTextField
                name="username"
                value={username ?? null}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setUsername(e.target.value)}
              />
              <CustomTextField
                disabled={userInfo?.email}
                name="email"
                value={userEmail ?? null}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Grid>
            <Grid 
              sx={{
                display: 'flex', 
                width: '100%', 
                height: '100%', 
                flex: '1', 
                justifyContent: 'center', 
                alignItems: 'center'
              }}
            >
              <Button 
                variant='contained'
                sx={{
                  width: '95%', 
                  margin: '1rem', 
                  marginBottom: '0',
                  '&.Mui-disabled': {
                    backgroundColor: 'lightgray!important',
                    background: 'transparent'
                  },
                  background: 'linear-gradient(to left, #507CE6 0%, #84A8FF 100%)',
                  color: 'white'
                }}
                disabled={
                  (userInfo?.email === userEmail) && 
                  (userInfo?.username === username)
                }
                onClick={() => handleUpdate()}
              >
                Save
              </Button>
            </Grid>
            <Grid 
              sx={{
                display: 'flex', 
                width: '100%', 
                height: '100%', 
                flex: '1', 
                justifyContent: 'center', 
                alignItems: 'center'
              }}
            >
              <Button 
                variant='outlined'
                sx={{
                  width: '95%', 
                  margin: '1rem', 
                  borderColor: 'red',
                  color: 'red'
                }}
                onClick={() => setDeleteProfileOpen(true)}
              >
                Delete Profile
              </Button>
            </Grid>
          </InformationCard>
          <InformationCard>
            <Grid 
              container 
              sx={{
                display: 'flex', 
                flexDirection: 'column', 
                width: '100%', 
                height: '100%', 
                justifyContent: 'space-around', 
                alignItems: 'center', 
                flexWrap: 'nowrap',
                overflow: 'auto'
              }}
            >
              <Grid 
                item 
                sx={{
                  flex: '1', 
                  display: 'flex', 
                  width: '100%', 
                  alignItems: 'flex-start', 
                  padding: '1rem'
                }}
              >
                <Typography variant='h5' sx={{color: 'gray'}}>Your Subscription</Typography>
              </Grid>
              <Grid 
                container 
                sx={{
                  flex: '1',
                  width: '95%',
                  height: '100%'
                }}
              >
                <Card
                  elevation={1} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    width: '100%',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="h4" component="div" gutterBottom>
                      {price === 0 ? 'Free' : `$${price}`}
                      {price > 0 && <Typography variant="subtitle1" component="span">/month</Typography>}
                    </Typography>
                    {features && (
                      <List>
                        {features.map((feature, index) => (
                          <ListItem key={index} sx={{ padding: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sx={{flex: '1', width: '100%', padding: '1rem'}}>
                <Button 
                  variant='contained' 
                  color='primary' 
                  sx={{width: '100%', color: 'white'}}
                  onClick={() => navigate('/subscriptions')}
                >
                  Update Subscription
                </Button>
              </Grid>
              {/* Offer an option to update billing info later */}
              {/* <Grid item sx={{flex: '1', width: '100%', padding: '1rem'}}>
                <a href='https://billing.stripe.com/p/login/7sIg1GgF3dGJcy46oo' target='_blank'>
                  <Button 
                    variant='contained' 
                    color='primary' 
                    sx={{width: '100%', color: 'white'}}
                  >
                    Update Billing Info
                  </Button>
                </a>
              </Grid> */}
            </Grid>
          </InformationCard>
          <InformationCard>
            <Grid 
              container 
              sx={{
                display: 'flex', 
                flexDirection: 'column', 
                width: '100%', 
                height: '100%', 
                justifyContent: 'space-around', 
                alignItems: 'center', 
                overflow: 'visible'
              }}
            >
              <Grid 
                item 
                sx={{
                  flex: '1', 
                  display: 'flex', 
                  width: '100%', 
                  alignItems: 'flex-start', 
                  padding: '1rem'
                }}
              >
                <Typography variant='h5' sx={{color: 'gray'}}>Wallet</Typography>
              </Grid>
              <Grid 
                container 
                sx={{
                  flex: '1', 
                  border: '1px solid #C6C6C6', 
                  borderRadius: '1rem', 
                  padding: '2rem 0', 
                  width: '95%'
                }}
              >
                <Grid 
                  sx={{
                    marginLeft: '1rem', 
                    display: 'flex', 
                    justifyContent: 'space-around', 
                    flexDirection: 'column', 
                    height: '100%'
                  }}
                >
                  <Typography 
                    variant='h6' 
                    sx={{color: 'gray'}}
                  >
                    AI Credits - <span style={{color: `${theme.palette.grays.main}`}}>{userInfo?.userCredits}</span>
                  </Typography>
                  <Typography 
                    variant='h6' 
                    sx={{color: 'gray'}}
                  >
                    Folders Used - <span style={{color: `${theme.palette.grays.main}`}}>{ownedMessageFolders?.length} / {getUserFoldersLimit()}</span>
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid item sx={{flex: '1', width: '100%', padding: '1rem'}}>
                <Button variant='contained' color='secondary' sx={{width: '100%'}}>
                  Add Credits Coming Soon!
                </Button>
              </Grid> */}
            </Grid>
          </InformationCard>
        </TabsAndPanelsParentBox>
      </MainContentAreaChildGrid>
      <Dialog open={deleteProfleOpen} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Are you sure you wish to delete your profile? This is unreversable.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant='contained'> 
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteProfile} 
            autoFocus 
            sx={{color: 'red', borderColor: 'red'}} 
            variant='outlined'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </MainContentArea>
  );
}

export default UserProfile;