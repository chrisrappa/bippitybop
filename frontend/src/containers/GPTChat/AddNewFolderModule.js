import React, { useState } from 'react'
import { 
  Button,
  Grid, 
  Typography, 
} from '@mui/material';
import { SaveResponseTextField } from './styled';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import gtmTrackButtonClick from '../../utils/gtmTrackButtonClick';
import { useDispatch } from 'react-redux';
import { createUserFolder } from '../../actions/documentActions';
import useCurrentUserInfo from '../../utils/useCurrentUserInfo';
import { useAuth0 } from '@auth0/auth0-react';


function AddNewFolderModule({
  userFolders,
  setAddNewFolder
}) {

  const dispatch = useDispatch();
  const userInfo = useCurrentUserInfo();
  const { isAuthenticated } = useAuth0();

  const folderNames = userFolders?.map((folder) => folder?.name);

  const [newFolderName, setNewFolderName] = useState(null);

  const checkForDuplicateFolder = (folderName) => {
    if(folderNames.includes(folderName)){
      return true;
    };

    return false;
  };

  const handleAddNewFolder = (e) => {
    gtmTrackButtonClick(e, 'click_addFolder');

    if(isAuthenticated){
      dispatch(
        createUserFolder({
          userId: userInfo?.user_id,
          newFolderName: newFolderName
        })
      );
    };

    setAddNewFolder(false);
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
        <Grid sx={{display: 'flex', alignItems: 'center'}}> 
          <CreateNewFolderIcon sx={{marginRight: '1rem', fontSize: '2rem', color: 'gray'}} />
          <Typography variant='h6' sx={{color: 'gray'}}>Add New Folder</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <SaveResponseTextField
          fullWidth 
          id="outlined-basic" 
          label="Folder Name" 
          variant="outlined" 
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          sx={{marginBottom: '1rem'}} 
          error={checkForDuplicateFolder(newFolderName)}
          helperText={
            checkForDuplicateFolder(newFolderName) && 
            'Folder Already Exists!'
          }
        />
      </Grid>
      <Grid
        item 
        sx={{
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center', 
        }}
      >
        <Button 
          variant='outlined' 
          sx={{
            padding: '0.25rem 1rem', 
            color: 'gray', 
            borderColor: 'lightgray', 
            marginRight: '0.5rem'
          }} 
          onClick={() => setAddNewFolder(false)}
        >
          <Typography>
            Cancel
          </Typography>
        </Button>
        <Button 
          variant='contained' 
          disabled={!newFolderName || checkForDuplicateFolder(newFolderName)} 
          sx={{
            padding: '0.25rem 1rem',
            background: `linear-gradient(to left, #507CE6 0%, #84A8FF 100%)`,
            color: 'white'
          }} 
          onClick={handleAddNewFolder}
        >
          <Typography>
            Confirm
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default AddNewFolderModule;