import React from 'react';
import { 
	Button,
  Chip,
  Divider, 
  Grid, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
	Typography,
	useTheme
} from "@mui/material";
import { navigationOptions, trialNavigationOptions } from "./menuOptions";
import { Link, useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';
import useCurrentUserInfo from '../../utils/useCurrentUserInfo';

function MobileDrawer({ 
	open, 
	setOpen, 
	logout,
	isAuthenticated,
	isAdmin,
	loginWithRedirect,
}){

	const theme = useTheme();
	const userInfo = useCurrentUserInfo();

	const navigate = useNavigate();

  const RenderSubscriptionTier = () => {
    switch(userInfo?.stripeProductId){
      case undefined || null :{
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

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100dvh'}}>
			<Divider />
			<List sx={{paddingTop: '0', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1'}}>
				{
					isAuthenticated ? (
						navigationOptions.map((option, index) => (
							<ListItem
								disablePadding 
								sx={{
									display: 'flex', 
									justifyContent: 'center', 
									alignItems: 'center', 
									height: '3.75rem', 
									width: '100%!important'
								}}
								component={Link}
								to={option?.link ?? '/'}
								key={option?.id}
								divider
								button
							>
								<ListItemButton
									onClick={(e) => {
										gtmTrackButtonClick(e, option?.analyticId)
										setOpen(false)
									}}
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
										height: '100%'
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										{option?.icon}
									</ListItemIcon>
									<ListItemText 
										primary={option?.name} 
										sx={{ 
											opacity: open ? 1 : 0, 
											fontFamily: `${theme.typography.secondary.fontFamily}`, 
											color: '#C6C6C6'
										}} 
									/>
								</ListItemButton>
							</ListItem>
						))
					) : (
						trialNavigationOptions.map((option, index) => (
							<ListItem
								disablePadding 
								sx={{ display: 'block', flex: '1' }}
								component={Link}
								to={option?.link ?? '/'}
								key={option?.id}
								divider
								button
							>
								<ListItemButton
									onClick={(e) => {
										gtmTrackButtonClick(e, option.analyticId);
										setOpen(false);
									}}
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
										height: '100%'
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										{option?.icon}
									</ListItemIcon>
									<ListItemText 
										primary={option?.name} 
										sx={{ 
											opacity: open ? 1 : 0, 
											fontFamily: `${theme.typography.secondary.fontFamily}`, 
											color: '#C6C6C6'
										}} 
									/>
								</ListItemButton>
							</ListItem>
						))
					)
				}
				{
					isAdmin && (
						<ListItem
							disablePadding 
							sx={{ display: 'block', flex: '1' }}
							component={Link}
							to={'/admin'}
							key={100}
							divider
							button
						>
							<ListItemButton
								onClick={() => setOpen(false)}
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
									height: '100%'
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<AdminPanelSettingsIcon />
								</ListItemIcon>
								<ListItemText 
									primary='Admin'
									sx={{ 
										opacity: open ? 1 : 0, 
										fontFamily: `${theme.typography.secondary.fontFamily}`,
										color: '#C6C6C6'
									}} 
								/>
							</ListItemButton>
						</ListItem>
					)
				}
			</List>
			<Grid sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>

				{
					isAuthenticated ? (
						<Grid>
							<ListItem sx={{flex: '6', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
								<RenderSubscriptionTier />
							</ListItem>
							<ListItem sx={{flex: '6', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
								<Button 
									color="secondary" 
									onClick={() => logout({
										logoutParams: { returnTo: window.location.origin } 
									})}
									sx={{display: 'block'}}
								>
									Log Out
								</Button>
							</ListItem>
						</Grid>
					) : (
						<ListItem sx={{flex: '6', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
							<Button 
								variant='outlined'
								onClick={(e) => {
										gtmTrackButtonClick(e, 'click_mobile_register')
										loginWithRedirect({
											authorizationParams: { screen_hint: "signup" }
										})
									}
								}
								sx={{display: 'block', color: 'white', padding: '0.5rem 3rem'}}
							>
								<Typography variant='h7'>
									Register Free!
								</Typography>
							</Button>
						</ListItem>
					)
				}

			</Grid>
    </Grid>
  )
};

export default MobileDrawer;