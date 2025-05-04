import { Grid, Typography } from "@mui/material";
import { UserMessageBox } from "./styled";
import { handleToHTML } from "./helpers";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserMessageRenderer({ message, style, ref }){

  return (
    <UserMessageBox style={style} ref={ref}>
      <Grid
        sx={{
          display: 'flex', 
          flex: '9', 
          width: '100%', 
          justifyContent: 'space-between', 
          // alignItems: 'center', 
          padding: '0.5rem',
          overflow: 'auto',
        }}
      >
        <Typography variant='h7' sx={{ color: 'black' }}>
          {handleToHTML(message?.content)}
        </Typography>
      </Grid>
      <Grid
        sx={{
          flex: '1', 
          marginLeft: '1rem', 
          display: 'flex', 
          justifyContent: 'flex-end'
        }}
      >
        <AccountCircleIcon sx={{fontSize: '3rem', color: 'gray'}} />
      </Grid>
    </UserMessageBox>
  )
};