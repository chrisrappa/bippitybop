import React from 'react';
import GPTChat from '../../containers/GPTChat';
import ContentArea from '../../components/ContentArea';
import { DrawerHeader, Main } from '../../styled';


function AIChat({ drawerOpen, drawerWidth }) {

  return (
    <Main open={drawerOpen} drawerWidth={drawerWidth}>
      <DrawerHeader />
      <ContentArea 
        drawerWidth={drawerWidth} 
        drawerOpen={drawerOpen} 
        childComponent={
          <GPTChat />
        } 
      />
    </Main>
  );
}

export default AIChat;