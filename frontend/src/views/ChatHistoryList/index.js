import React from 'react'
import ChatHistory from '../../containers/ChatHistory';
import ContentArea from '../../components/ContentArea';
import { DrawerHeader, Main } from '../../styled';

function ChatHistoryList({ drawerOpen, drawerWidth }) {

  return (
    <Main open={drawerOpen} drawerWidth={drawerWidth}>
      <DrawerHeader />
      <ContentArea childComponent={<ChatHistory />} />
    </Main>
  );
}

export default ChatHistoryList;