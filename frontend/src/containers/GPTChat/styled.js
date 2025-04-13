import { 
  Box, 
  Button, 
  FormControl, 
  Grid, 
  MenuItem, 
  Paper, 
  Select, 
  TextField,
  Typography, 
  styled 
} from "@mui/material";

const isFirefox = typeof window !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const ChatContainer = styled(Box)(({theme}) => ({
  
  display: 'flex',
  flexDirection: 'column',
  height: isFirefox ? '100%' : '-webkit-fill-available',
  overflowY: 'auto',
  borderRadius: '8px',
  width: '100%',
  padding: '1rem 5rem',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: '0'
  }
}));

const MessageBox = styled(Paper)(({ theme }) => ({
  padding: '10px',
  margin: '10px 0',
  alignSelf: 'flex-start',
  flexDirection: 'column',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  color: 'white',
  display: 'flex',
  justifyContent: 'flex-start', 
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
}));

const UserMessageBox = styled(MessageBox)(({theme}) => ({
  alignSelf: 'flex-end',
  backgroundColor: '#EEF2FC',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '-webkit-fill-available',
  borderRadius: '2rem'
}));

const ChatInputContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  padding: '1rem',
  paddingLeft: '0',
  paddingRight: '0',
  [theme.breakpoints.up('md')]: {
    maxWidth: '75dvw'
  }
}));

const FullChatContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100dvh',
  backgroundColor: '#ffffff',
});

const CustomTextField = styled(TextField)(({theme}) => ({
  margin: '0',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #d7def8!important',
      borderRadius: '1.5rem',
    },
    '&:hover fieldset': {
      borderColor: `${theme.palette.secondary.main}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme.palette.secondary.main}`,
    },
    color: `${theme.palette.grays.main}`,
    padding: '0.75rem'
  },
  '& .MuiInputLabel-root': {
    color: `gray`,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: `gray`,
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
}));

const SaveResponseTextField = styled(TextField)(({theme}) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: `${theme.palette.grays.md}`,
      borderRadius: '0.5rem',
    },
    '&:hover fieldset': {
      borderColor: `${theme.palette.grays.md}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme.palette.grays.md}`,
    },
    color: `${theme.palette.grays.main}`,
  },
  '& .MuiInputLabel-root': {
    color: `gray`,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: `gray`,
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
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: 'gray',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'gray',
    },
    '&:hover fieldset': {
      borderColor: 'gray',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    color: 'gray',
  },
  '& .MuiSelect-icon': {
    color: 'gray',
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  color: 'lightgray',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'lightgray',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'lightgray',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.secondary.main,
  },
}));

const CustomMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: '8px',
  },
});

const AddNewFolderButton = styled(Button)(({theme}) => ({
  display: 'flex',
  width: '100%',
  padding: '0.75rem',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: '8px',
  },
}))

const CustomTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
});

const CodeBlockContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '68dvw', // Adjust as needed
  overflow: 'auto',
  borderRadius: '5px',
  // padding: '10px',
  backgroundColor: '#2d2d2d', // Match the theme background,
  [theme.breakpoints.down('md')]: {
    maxWidth: '75dvw'
  }
}));

const MarkdownRendererGridContainer = styled(Grid)(({theme}) => ({
  flex: '10', 
  padding: '0.5rem', 
  display: 'flex', 
  flexWrap: 'wrap',
  maxWidth: '75dvw',
  overflowX: 'auto',
  overflowY: 'visible',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '90dvw'
  }
}));

export {
  ChatContainer,
  UserMessageBox,
  ChatInputContainer,
  FullChatContainer,
  MessageBox,
  CustomTextField,
  SaveResponseTextField,
  CustomFormControl,
  CustomSelect,
  CustomMenuItem,
  CustomTypography,
  AddNewFolderButton,
  CodeBlockContainer,
  MarkdownRendererGridContainer
}