import XIcon from '@mui/icons-material/X';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export const navigationOptions = [
  {id: 0, analyticId: 'click_ai_chat', name: "AI Chat", link: '/ai-chat', icon: <AutoAwesomeOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 1, analyticId: 'click_support', name: "Support", link: '/support', icon: <BugReportOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} /> },
  {id: 2, analyticId: 'click_devUpdates', name: "Dev Updates", link: 'https://x.com/dev_rappa', icon: <XIcon sx={{fontSize: '1.5rem', color: 'white'}} /> }
];
