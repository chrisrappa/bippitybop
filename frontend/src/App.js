import { 
  Routes, 
  Route, 
  Navigate,
} from 'react-router-dom';
import { AppContainer } from './styled';
import Profile from './views/Profile';
import AppNavigation from './components/AppNavigation';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Support from './views/Support';
import ChatHistoryList from './views/ChatHistoryList';
import AIChat from './views/AppHome';
import { drawerWidth } from './components/AppNavigation/styled';

function App() {

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(isMobile ? false : true);

  console.log(
    '%c Go away, nothing to see here ;)', 
    'background: #66a18c; color: white; font-size: 20px;'
  );
  
  return (
    <AppContainer>
      <CssBaseline />
      <AppNavigation
        setDrawerOpen={setDrawerOpen} 
        drawerOpen={drawerOpen} 
        drawerWidth={drawerWidth}
      />
      <Routes>

          <Route path = "/" element={<Navigate to="/ai-chat" />} />

          <Route path = "/support"        element = { <Support         drawerOpen={drawerOpen} drawerWidth={drawerWidth} /> } />
          <Route path = "/profile/:slug"  element = { <Profile         drawerOpen={drawerOpen} drawerWidth={drawerWidth} /> } />
          <Route path = "/ai-chat"        element = { <AIChat          drawerOpen={drawerOpen} drawerWidth={drawerWidth} /> } />                        
          <Route path = "/chat-history"   element = { <ChatHistoryList drawerOpen={drawerOpen} drawerWidth={drawerWidth} /> } />                      
      </Routes>
    </AppContainer>
  );
};

export default App;