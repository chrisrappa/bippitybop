import React from 'react';
import { 
  Divider, 
  Grid, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
	useTheme
} from "@mui/material";
import { navigationOptions } from "./menuOptions";
import { Link } from 'react-router-dom';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';

function MobileDrawer({ 
	open, 
	setOpen,
}){

	const theme = useTheme();

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100dvh'}}>
			<Divider />
			<List sx={{paddingTop: '0', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1'}}>
				{
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
				}
			</List>
    </Grid>
  )
};

export default MobileDrawer;