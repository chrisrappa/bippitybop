import XIcon from '@mui/icons-material/X';
import AssistantIcon from '@mui/icons-material/Assistant';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const navigationOptions = [
  {id: 0, analyticId: 'click_ai_chat', name: "AI Pals", link: '/ai-chat', icon: <AssistantIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 1, analyticId: 'click_support', name: "Support", link: '/support', icon: <SupportAgentIcon sx={{fontSize: '1.5rem', color: 'white'}} /> },
  {id: 2, analyticId: 'click_devUpdates', name: "Dev Updates", link: 'https://x.com/dev_rappa', icon: <XIcon sx={{fontSize: '1.5rem', color: 'white'}} /> }
];
