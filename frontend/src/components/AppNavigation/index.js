import React from 'react';
import { useMediaQuery } from '@mui/material';
import MobileDrawerHousing from './MobileDrawerHousing';
import TopAppBar from './TopAppBar';
import DesktopDrawerHousing from './DesktopDrawerHousing';

function AppNavigation({
	drawerOpen,
	setDrawerOpen,
	drawerWidth,
	...props
}) {

	// const iOS = process?.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const { windowProps } = props;
	const container = windowProps !== undefined ? () => windowProps().document.body : undefined;
	
	const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

	return (
		<>
			<TopAppBar 
				drawerOpen={drawerOpen}
				drawerWidth={drawerWidth}
				handleDrawerToggle={handleDrawerToggle}
			/>

			{
				!isMobile ? (
					<DesktopDrawerHousing 
						desktopDrawerOpen={drawerOpen}
						handleDrawerToggle={handleDrawerToggle}
						drawerWidth={drawerWidth}
					/>
				) : (
					<MobileDrawerHousing 
						container={container}
						handleDrawerToggle={handleDrawerToggle}
						open={drawerOpen}
						setOpen={setDrawerOpen}
						drawerWidth={drawerWidth}
					/>
				)
			}
		</>
	)
}

export default AppNavigation;
