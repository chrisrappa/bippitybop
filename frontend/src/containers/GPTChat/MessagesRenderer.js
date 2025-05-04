import React, { useEffect, useRef } from 'react';
import { VariableSizeList as List } from 'react-window';
import UserMessageRenderer from './UserMessageRenderer';
import ResizeObserver from 'resize-observer-polyfill';
import { MarkdownRendererGridContainer, MessageBox } from './styled';
import { 
  Grid, 
  Typography, 
  useMediaQuery, 
} from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';
import AutoSizer from 'react-virtualized-auto-sizer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function MessagesRenderer({
  messages, 
  selectedVersion,
}) {

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const listRef = useRef();
  const sizeMap = useRef({});

  const getItemSize = index => {
    return sizeMap.current[index] || 100; // Default height
  };

  const setItemSize = (index, size) => {
    sizeMap.current[index] = size;
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
  };

  const MessageRow = ({ index, style }) => {
    const message = messages[index];
    const rowRef = useRef();

    useEffect(() => {
      if (!rowRef.current) return;

      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          const height = entry.borderBoxSize[0]?.blockSize || 
                        entry.target.getBoundingClientRect().height;
          console.log(`Message ${index} actual height:`, height);
          setItemSize(index, height);
        }
      });

      observer.observe(rowRef.current);

      return () => observer.disconnect();
    }, [index]);

    const messageStyle = {
      ...style,
      height: 'auto', // Allow content to determine height
      minHeight: style.height // Maintain minimum height from virtualization
    };

    if (message.role === 'user') {
      return (
        <UserMessageRenderer ref={rowRef} style={messageStyle} message={message} />
      );
    }

    return (
      <MessageBox ref={rowRef} style={messageStyle}>
        <Grid
          sx={{
            flex: '1', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: '1rem'
          }}
        >
          <img
            alt={`${selectedVersion?.id}`}
            src={`${selectedVersion?.icon}`}
            style={{
              width: '50px',
              height: '50px',
              marginRight: '0.5rem',
            }}
          />
        </Grid>
        <MarkdownRendererGridContainer>
          
          <Typography
            variant='h6' 
            sx={{
              marginLeft: '0.5rem', 
              textWrap: 'wrap',
              color: '#373737',
              height: '100%'
            }}
          >
            <MarkdownRenderer content={message?.content} />
          </Typography>
        </MarkdownRendererGridContainer>
      </MessageBox>
    );
  };

  const renderMessages = () => {
    if (!messages.length) return null;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            itemCount={messages.length}
            itemSize={getItemSize}
            width={width}
            overscanCount={5}
          >
            {MessageRow}
          </List>
        )}
      </AutoSizer>
    );
  };

  const renderPlaceholder = () => (
    <Grid
      sx={{
        height: '95%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: isMobile ? 'flex-end' : 'center'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          width: '100%',
          overFlowX: 'auto',
          marginLeft: isMobile && '1rem',
        }}
      >
        <Typography>
          Ask {selectedVersion.name} Anything!
        </Typography>
      </Grid>
    </Grid>
  );

  return messages.length ? renderMessages() : renderPlaceholder();
};

export default MessagesRenderer;