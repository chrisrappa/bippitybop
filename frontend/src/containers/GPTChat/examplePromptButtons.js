import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const examplePromptButtons = [
  {
    title: 'Write me a course outline.',
    icon: <ArticleOutlinedIcon sx={{ color: 'green'}} />,
    textContent: 'Write me a simple well structured course outline for an Intro to Roman History.'
  },
  {
    title: 'Make a simple React home page.',
    icon: <CodeOutlinedIcon sx={{ color: 'blue' }} />,
    textContent: 'Make a simple React home page with a header, footer, and navigation links.'
  },
  {
    title: 'Create a social media marketing plan.',
    icon: <ShareOutlinedIcon sx={{ color: 'orange'}} />,
    textContent: 'Create a easy, well structured social media marketing plan outline for a small business.'
  },
  {
    title: "Visit the FAQ for How-To's",
    icon: <HelpOutlineOutlinedIcon />,
    textContent: null,
    link: '/faq'
  }
];

export default examplePromptButtons;