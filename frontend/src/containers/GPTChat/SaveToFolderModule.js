import React from 'react'
import { 
  Button, 
  CircularProgress, 
  Divider, 
  Grid, 
  IconButton, 
  InputLabel, 
  Typography, 
  useTheme
} from '@mui/material';
import { 
  CustomFormControl, 
  CustomMenuItem, 
  CustomSelect, 
  CustomTypography, 
  SaveResponseTextField 
} from './styled';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';
import { useAuth0 } from '@auth0/auth0-react';
import useCurrentUserInfo from '../../utils/useCurrentUserInfo';
import subscriptionPlans from '../../consts/subscriptionPlans';

function SaveToFolderModule({
  selectedFolder,
  handleSaveDoc,
  handleClose,
  handleChange,
  userFolders,
  setAddNewFolder,
  selectedDocName,
  setSelectedDocName,
  createFolderLoading
}) {

  const navigate = useNavigate();
  const theme = useTheme();
  const userInfo = useCurrentUserInfo();
  const { isAuthenticated } = useAuth0();
  const trialFolderData = {
    _id: 0,
    name: 'All'
  };

  const ownedFolders = useSelector((state) => state?.gptChat?.ownedFolders);

  const currentSubscription = userInfo?.subscriptionProductId;
  const currentPlanObject = subscriptionPlans.filter(
    (plan) => currentSubscription === plan.subscriptionProductId
  )[0] ?? subscriptionPlans[0];

  const getUserFoldersLimit = () => {
    if(!currentPlanObject?.subscriptionProductId){
      return 10;
    };

    if(currentPlanObject.subscriptionProductId === process.env.REACT_APP_SUB_TIER_PLUS){
      return 50;
    };

    if(currentPlanObject.subscriptionProductId === process.env.REACT_APP_SUB_TIER_PREMIUM){
      return 99999999;
    };
  };

  const userOverFolderLimit = () => {
    if(ownedFolders.length >= getUserFoldersLimit()){
      return true;
    };

    return false;
  };

  return (
    <Grid 
      container 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        width: '20rem', 
        height: '100%', 
        padding: '0 1rem 1rem 1rem', 
        // backgroundColor: '#333333'
      }}
    >
      <Grid 
        item 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 0'
        }}
      >
        <Button 
          variant='contained' 
          color='secondary' 
          sx={{
            padding: '0.25rem 3rem',
            background: `linear-gradient(to left, #507CE6 0%, #84A8FF 100%)`,
            color: 'white'
          }}
          disabled={!selectedDocName || (!selectedFolder && isAuthenticated)}
          onClick={(e) => {
            gtmTrackButtonClick(e, 'click_saveFile');
            handleSaveDoc(selectedDocName);
            setSelectedDocName(null);
          }}
        >
          <Typography variant='h6'>
            Confirm
          </Typography>
        </Button>
        <IconButton 
          sx={{ border: '1px solid lightgray'}} 
          onClick={() => {
            setSelectedDocName(null);
            handleClose();
          }}
        >
          <CloseOutlinedIcon 
            sx={{fontSize: '1.5rem', color: 'gray'}} 
          />
        </IconButton>
      </Grid>
      <Grid item>
        <SaveResponseTextField 
          fullWidth 
          id="outlined-basic" 
          label="Name" 
          variant="outlined" 
          value={selectedDocName}
          onChange={(e) => setSelectedDocName(e.target.value)}
          sx={{marginBottom: '1rem'}} 
        />
      </Grid>
      <Grid item>
        <CustomFormControl fullWidth>
          <InputLabel id="folder-select-label">
            Folder
          </InputLabel>
          <CustomSelect
            labelId="folder-select-label"
            id="folder-select"
            value={ isAuthenticated ? selectedFolder : trialFolderData}
            disabled={createFolderLoading || !isAuthenticated}
            label="Folder"
            onChange={(e) => handleChange(e.target.value)}
            renderValue={(selected) => {
              if(createFolderLoading){
                return(
                  <CircularProgress />
                )
              };

              return(
                <CustomTypography>
                  <FolderIcon sx={{ color: 'gray', flex: '1' }} /> 
                  <Grid sx={{flex: '4'}}>
                    {selected?.name}
                  </Grid>
                </CustomTypography>
              )
            }}
          >
            {
              userFolders?.map((folder) => (
                <CustomMenuItem key={folder?._id} value={folder} sx={{padding: '1rem'}}>
                  <FolderIcon sx={{ color: 'gray' }} />
                  <Typography>{folder?.name}</Typography>
                </CustomMenuItem>
              ))
            }

            <Divider />
            
            {
              (userOverFolderLimit()) ? (
                <CustomMenuItem 
                  sx={{ justifyContent: 'center'}}
                  onClick={() => navigate('/subscriptions')}
                >
                  <>
                    <svg width={0} height={0}>
                        <linearGradient id="exampleColors" x1={1} y1={0} x2={1} y2={1} gradientTransform="rotate(45)">
                          <stop offset='0%' stopColor="#507CE6" />
                          <stop offset='50%' stopColor="#84A8FF" />
                          <stop offset='100%' stopColor="#FED602" />
                        </linearGradient>
                      </svg>
                      <WorkspacePremiumIcon 
                        sx={{ 
                          fill: "url(#exampleColors)", 
                          marginRight: '1rem', 
                          flex: '1', 
                          fontSize: '2rem' 
                        }} 
                      />
                  </>

                  <Typography 
                    variant='h6'
                    sx={{
                      marginLeft: '1rem', 
                      color: `gray`, 
                      flex: '8'
                    }}
                  >
                    Upgrade For More
                  </Typography>
                </CustomMenuItem>
              ) : (
                <CustomMenuItem 
                  onClick={() => setAddNewFolder(true)}
                  sx={{ 
                    justifyContent: 'center',
                    background: 'linear-gradient(to left, #507CE6 0%, #84A8FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  <>
                    <svg width={0} height={0}>
                      <linearGradient id="exampleColors" x1={1} y1={0} x2={1} y2={1} gradientTransform="rotate(45)">
                        <stop offset='0%' stopColor="#507CE6" />
                        <stop offset='50%' stopColor="#84A8FF" />
                        <stop offset='100%' stopColor="#FED602" />
                      </linearGradient>
                    </svg>
                    <CreateNewFolderIcon 
                      sx={{ 
                        fill: "url(#exampleColors)", 
                        marginRight: '1rem', 
                        flex: '1', 
                        fontSize: '2rem' 
                      }} 
                    />
                  </>
                  <Typography 
                    variant='h6' 
                    sx={{
                      marginLeft: '1rem', 
                      color: `gray`, 
                      flex: '8'
                    }}>
                    Add New
                  </Typography>
                </CustomMenuItem>
              )
            }
          </CustomSelect>
        </CustomFormControl>
      </Grid>
    </Grid>
  )
}

export default SaveToFolderModule;