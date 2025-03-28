import React from 'react';
import { InnerContentGrid, MainContentArea } from './styled';

function ContentArea({
  childComponent,
  drawerWidth,
  drawerOpen
}) {
  
  return (
    <MainContentArea elevation={0} drawerWidth={drawerWidth}>
      <InnerContentGrid container>
        {childComponent}
      </InnerContentGrid>
    </MainContentArea>
  )
}

export default ContentArea;