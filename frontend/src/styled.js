import { Grid, styled } from "@mui/material";
import { MaterialDesignContent } from 'notistack'

const AppContainer = styled(Grid)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  height: '100dvh',
}));

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({theme}) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: `${theme?.palette?.secondary?.main}`,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, drawerWidth }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    width: `calc(100dvw - ${drawerWidth}px)`, 
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: '100dvw',
      padding: '0',
    }
  }),
);

export { AppContainer, StyledMaterialDesignContent, DrawerHeader, Main };