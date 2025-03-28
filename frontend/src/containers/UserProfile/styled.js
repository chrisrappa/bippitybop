import { 
  Box,  
  Card,  
  Grid, 
  Paper, 
  TextField, 
  styled 
} from "@mui/material";

const MainContentArea = styled(Paper)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  height: '100%',
  width: '100%',
  marginTop: '1rem',
  flexWrap: 'wrap',
  maxHeight: '80dvh',
  backgroundColor: 'transparent'
}));

const AvatarContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyStartAlignCenter,
  flex: '0.5',
  // backgroundColor: `${theme.palette.whites.main}`,
  padding: '0!important',
  width: '100%',
}));

const TabsAndPanelsParentBox = styled(Box)(({theme}) => ({
  display: 'flex', 
  width: '100%', 
  flex: '4', 
  height: '100%',
  overflow: 'auto',
  padding: '1rem',
  justifyContent: 'space-evenly',
  flexWrap: 'nowrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
  // backgroundColor: `${theme.palette.whites.main}`
}));

const MainContentAreaChildGrid = styled(Grid)(() => ({
  width: '100%'           , 
  height: '100%'          ,
  display: 'flex'         ,
  flexDirection: 'column' ,
  flexWrap: 'nowrap'      ,
}));

const InformationCard = styled(Card)(({theme}) => ({
  display: 'flex', 
  flex: '1',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '1rem',
  minWidth: '15rem',
  width: '100%',
  maxHeight: '25rem',
  height: 'fit-content',
  // backgroundColor: '#1E1E1E',
  flexDirection: 'column',
  borderRadius: '0.5rem',
  flexWrap: 'nowrap',
  padding: '1rem',
  overflow: 'visible',
  [theme.breakpoints.down('md')]: {
    padding: '0',
    margin: '1rem 0',
    maxHeight: 'none'
  }
}));

const CustomTextField = styled(TextField)(({theme}) => ({
  padding: '0 1rem',
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "lightgray!important",
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: `${theme.palette.primary.main}`,
    },
    '&:hover fieldset': {
      borderColor: `${theme.palette.primary.main}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme.palette.primary.main}`,
    },
    color: 'gray'
  },
  '& .MuiInputLabel-root': {
    color: 'gray',
    padding: '0 1rem'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'gray',
    padding: '0 1rem'
  },
  '& .MuiOutlinedInput-input': {
    color: 'gray',
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray',
  },
  '& .MuiOutlinedInput-input::placeholder': {
    color: 'gray',
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    '& fieldset': {
      borderColor: 'lightgray',
    }
  },
}));

export { 
  MainContentArea,
  MainContentAreaChildGrid,
  AvatarContainer,
  TabsAndPanelsParentBox,
  InformationCard,
  CustomTextField
};