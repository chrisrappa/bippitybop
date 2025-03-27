import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      variant='outlined' 
      sx={{color: 'purple', borderColor: 'white', justifyContent: 'center'}} 
      onClick={(e) => {
        gtmTrackButtonClick(e, 'click_login_desktop_header');
        loginWithRedirect();
      }}
    >
      Log In
    </Button>
  )
}

export default LoginButton;