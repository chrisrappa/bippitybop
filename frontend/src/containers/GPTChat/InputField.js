import React, { useState } from 'react'
import { CustomTextField } from './styled';
import { handleKeyDown } from './helpers';
import { CircularProgress, IconButton, InputAdornment, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useSelector } from 'react-redux';

function InputField({
  inputRef,
  handleSend,
  responseLoading,
  userGenCredits
}) {
  
  const [input, setInput] = useState('');
  const selectedVersion = useSelector((state) => state?.gptChat?.gptVersion);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <CustomTextField
      name="subject"
      label={`Message ${selectedVersion}`}
      ref={inputRef}
      variant="outlined"
      multiline
      maxRows={1}
      onFocus={event => {
        event.target.select();
      }}
      fullWidth
      onKeyDown={(e) => handleKeyDown(e, setInput, setTimeout, handleSend, responseLoading)}
      onChange={(e) => setInput(e.target.value)}
      value={input}
      sx={{backgroundColor: '#EEF2FC', borderRadius: '2rem', flex: isMobile ? '4' : '9'}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {
              responseLoading ? (
                <CircularProgress sx={{ color: '#84A8FF' }} />
                // Figure out how to stop generating later
                // <IconButton 
                //   color="primary" 
                //   sx={{backgroundColor: 'gray'}}
                //   onClick={() => setStopGenerating(true)}
                //   disabled={(selectedVersion === 'GPT 4o') && (userGenCredits < 6)}
                // >
                //   <StopCircleIcon sx={{color: '#333333'}} />
                // </IconButton>
              ) : (
                <IconButton
                  color="secondary" 
                  sx={{backgroundColor: '#c3c9dd'}}
                  onClick={() => {
                    handleSend(input);
                    setInput('');
                  }}
                  disabled={(selectedVersion === 'GPT 4o') && (userGenCredits < 6)}
                >
                  <ArrowUpwardIcon />
                </IconButton>
              )
            }
          </InputAdornment>
        ),
      }}
    />
  )
}

export default InputField;