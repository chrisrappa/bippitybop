import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
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
  Grid,
  Typography 
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { editUsernameEmail } from '../../actions/userActions';
import useCurrentUserInfo from '../../utils/useCurrentUserInfo';

function UserProfile() {

  const theme = useTheme();
  const dispatch = useDispatch();
  const userInfo = useCurrentUserInfo();

  const [userEmail, setUserEmail] = useState(userInfo?.email);
  const [username, setUsername] = useState(userInfo?.username);

  const handleUpdate = () => {
    dispatch(
      editUsernameEmail({ 
        userId: userInfo?.user_id, 
        username: username, 
        email: userEmail
      }, dispatch)
    );
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
                </Grid>
              </Grid>
            </Grid>
          </InformationCard>
        </TabsAndPanelsParentBox>
      </MainContentAreaChildGrid>
    </MainContentArea>
  );
}

export default UserProfile;