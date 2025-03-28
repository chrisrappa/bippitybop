import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({theme}) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: `${theme.palette.grays.md}`,
    },
    '&:hover fieldset': {
      borderColor: `${theme.palette.grays.md}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${theme.palette.grays.md}`,
    },
    color: 'gray',
  },
  '& .MuiInputLabel-root': {
    color: 'gray',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'gray',
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

export { CustomTextField }