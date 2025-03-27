import React, { useState } from 'react';
import { Button, Typography, Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useToast } from '../../libs/toast';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
import { CustomTextField } from './styled';
import useCurrentUserInfo from '../../utils/useCurrentUserInfo';

function ContactSupport() {

  const toast = useToast();
  const userInfo = useCurrentUserInfo();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [formState, setFormState] = useState({
    subject: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      // Send formState data to supportEmail
      await axios.post(
        `${process.env.REACT_APP_API_PATH}api/support/create-support-ticket`,
        {
          subject: formState?.subject,
          description: formState?.description,
          user_id: userInfo?.user_id
        }
      )
      .then((response) => {
        if(response.status === 200){
          setSubmitted(true);
        } else {
          toast.error('There was a problem submitting your bug');
        }
      })
  };

  return (
    <Grid sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem'}}>
    {
      !submitted ? (
        <form
          onSubmit={handleSubmit}
          style={{width: '100%', height: '100%'}}
        >
          <Grid 
            container
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: isMobile ? 'space-evenly' : 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Grid item sx={{width: '100%'}}>
              <Typography variant='h4' sx={{color: 'gray'}}>Found a bug? Have Feedback? Let us know!</Typography>
            </Grid>
            <Grid item sx={{width: '100%'}}>
              <CustomTextField
                name="subject"
                label="Subject"
                variant="outlined"
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <CustomTextField
                name="description"
                label="Description"
                variant="outlined"
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
            </Grid>
            <Grid sx={{width: '100%', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end'}}>
              <Button 
                type="submit" 
                variant="contained" 
                color="secondary"
                sx={{
                  padding: isMobile ? '0.75rem 6rem' : '0.25rem 2rem',
                  borderRadius: '2rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  background: `linear-gradient(to left, #507CE6 0%, #84A8FF 100%)` 
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        ) : (
          <Grid 
            container 
            sx={{
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              height: '100%'
            }}
          >
            <Typography variant="h6" sx={{color: 'gray'}}>Thank you for your submission!</Typography>
            <Typography sx={{textAlign: 'center', color: 'gray'}}>Please check our X page or Instagram for Updates</Typography>
            <Typography sx={{width: '50%', display: 'flex', justifyContent: 'space-around', marginTop: '1rem'}}>
              <Link to='https://www.instagram.com/vortexmediaconsulting/'>
                <InstagramIcon sx={{fontSize: '3rem', color: '#84A8FF'}} /> 
              </Link>
              <Link to='https://twitter.com/vortexmedia2023'>
                <TwitterIcon sx={{fontSize: '3rem', color: '#84A8FF'}}/> 
              </Link>
            </Typography>
          </Grid>
        )
      }
    </Grid>
  );
};

export default ContactSupport;