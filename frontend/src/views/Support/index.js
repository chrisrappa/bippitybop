import React from 'react'
import ContentArea from '../../components/ContentArea';
import ContactSupport from '../../containers/ContactSupport';
import { DrawerHeader, Main } from '../../styled';

function Support({ drawerOpen, drawerWidth }) {

  return (
    <Main open={drawerOpen} drawerWidth={drawerWidth}>
      <DrawerHeader />
      <ContentArea childComponent={<ContactSupport />} />
    </Main>
  );
}

export default Support;