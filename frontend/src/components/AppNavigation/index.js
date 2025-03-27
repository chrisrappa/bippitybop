import React, { useEffect } from 'react';
import {
	useTheme,
	useMediaQuery
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MobileDrawerHousing from './MobileDrawerHousing';
import TopAppBar from './TopAppBar';
import DesktopDrawerHousing from './DesktopDrawerHousing';
import { dbSavedMessages } from '../../actions/gptChatActions';
import { retrieveUserFolders } from '../../actions/documentActions';

function AppNavigation({
	drawerOpen,
	setDrawerOpen,
	drawerWidth,
	...props
}) {
	
	const theme 		=	useTheme();
	const dispatch 	=	useDispatch();
	const navigate 	= useNavigate();

	const { 
		isAuthenticated, 
		logout,
		loginWithRedirect,
	} = useAuth0();

	const userInfo = useSelector((state) => state?.userData?.loginInfo);

	// const iOS = process?.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const { windowProps } = props;
	const container = windowProps !== undefined ? () => windowProps().document.body : undefined;
	
	const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
	
  useEffect(() => {
    if(isAuthenticated && userInfo?.user_id){
			
      dispatch(
				dbSavedMessages(
					{
						userId: userInfo?.user_id, 
						invitedMessage: null 
					}, 
					dispatch
				)
			);

			dispatch(
				retrieveUserFolders(userInfo?.user_id, dispatch)
			);
    };

    // eslint-disable-next-line
  }, [isAuthenticated, userInfo?.user_id]);

	return (
		<>
			<TopAppBar 
				drawerOpen={drawerOpen}
				drawerWidth={drawerWidth}
				isMobile={isMobile}
				handleDrawerToggle={handleDrawerToggle}
				isAuthenticated={isAuthenticated}
				navigate={navigate}
				loginWithRedirect={loginWithRedirect}
				userInfo={userInfo}
				theme={theme}
				logout={logout}
			/>

			{
				!isMobile ? (
					<DesktopDrawerHousing 
						theme={theme}
						desktopDrawerOpen={drawerOpen}
						handleDrawerToggle={handleDrawerToggle}
						logout={logout}
						isAuthenticated={isAuthenticated}
						userInfo={userInfo}
						drawerWidth={drawerWidth}
					/>
				) : (
					<MobileDrawerHousing 
						container={container}
						handleDrawerToggle={handleDrawerToggle}
						open={drawerOpen}
						theme={theme}
						isAuthenticated={isAuthenticated}
						navigate={navigate}
						setOpen={setDrawerOpen}
						userInfo={userInfo}
						logout={logout}
						loginWithRedirect={loginWithRedirect}
						drawerWidth={drawerWidth}
					/>
				)
			}
		</>
	)
}

export default AppNavigation;
