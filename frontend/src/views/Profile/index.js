import React from 'react'
import ContentArea from '../../components/ContentArea';
import UserProfile from '../../containers/UserProfile';
import { DrawerHeader, Main } from '../../styled';


function Profile({ drawerOpen, drawerWidth }) {

  return (
    <Main open={drawerOpen} drawerWidth={drawerWidth}>
      <DrawerHeader />
      <ContentArea childComponent={<UserProfile />} />
    </Main>
  );
}

export default Profile;