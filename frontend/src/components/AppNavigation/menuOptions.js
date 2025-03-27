import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FolderIcon from '@mui/icons-material/Folder';
import XIcon from '@mui/icons-material/X';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TourIcon from '@mui/icons-material/Tour';

export const navigationOptions = [
  {id: 0, analyticId: 'click_user_dash', name: "Dashboard", link: '/dashboard', icon: <SpaceDashboardOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 1, analyticId: 'click_ai_chat', name: "AI Chat", link: '/ai-chat', icon: <AutoAwesomeOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 2, analyticId: 'click_folders', name: "Folders", link: '/folders', icon: <FolderOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 3, analyticId: 'click_assistant', name: "My Assistant", link: '/assistant', icon: <PsychologyIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 4, analyticId: 'click_support', name: "Support", link: '/support', icon: <BugReportOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} /> },
  {id: 5, analyticId: 'click_profile', name: "Profile", link: '/profile/info', icon: <AccountCircleOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} /> },
  {id: 6, analyticId: 'click_faq', name: "FAQ", link: '/faq', icon: <HelpOutlineOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} /> },
  {id: 7, analyticId: 'tour_init', name: "Interactive Tour", link: '/demo/ai-chat', icon: <TourIcon sx={{fontSize: '1.5rem', color: 'white'}} /> },
  {id: 8, analyticId: 'click_devUpdates', name: "Dev Updates", link: 'https://x.com/GptOrganized', icon: <XIcon sx={{fontSize: '1.5rem', color: 'white'}} /> }
];

export const trialNavigationOptions = [
  {id: 0, analyticId: 'click_user_dash', name: "Dashboard", link: '', icon: <SpaceDashboardOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 1, analyticId: 'click_trial_ai_chat', name: "AI Chat", link: '', icon: <AutoAwesomeIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 2, analyticId: 'click_trial_folders', name: "Folders", link: '', icon: <FolderIcon sx={{fontSize: '1.5rem', color: 'white'}} />}, 
  {id: 3, analyticId: 'click_trial_faq', name: "FAQ", link: '', icon: <HelpOutlineOutlinedIcon sx={{fontSize: '1.5rem', color: 'white'}} /> },
  {id: 4, analyticId: 'click_trial_devUpdates', name: "Dev Updates", link: '', icon: <XIcon sx={{fontSize: '1.5rem', color: 'white'}} /> }
];
