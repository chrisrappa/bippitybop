import { createTheme } from '@mui/material';
// Colors

// Mains - Opacity
const primaryLight = 'rgba(132, 168, 255, 0.25)'
const primaryMedium = 'rgba(159,128,101, 0.35)'
const primaryFull = '#84A8FF';

// Secondaries - Opacity
const secondaryLight = 'rgba(102,161,140, 0.15)';
const secondaryMedium = 'rgba(102,161,140, 0.35)';
const secondaryFull = '#EEF2FC';

// White & Grays
const grayLight = 'rgba(73,73,73, 0.1)';
const grayMedium = 'rgba(73,73,73, 0.5)';
const grayFull = 'rgba(30,30,30, 1)';

const whiteLight = 'rgba(255, 255, 255, 0.1)';
const whiteMedium = 'rgba(255, 255, 255, 0.5)';
const whiteFull = 'rgba(255, 255, 255, 1)';

// Font Colors
const primaryFontColor = 'black';
const secondaryFontColor = 'black';
const tabPrimaryFontColor = 'black';
const tabSecondaryFontColor = 'black';

// Buttons
const primaryButtonTextColor = `${whiteMedium}`;
const secondaryButtonTextColor = `${whiteFull}`;
const primaryButtonColor = `${primaryFull}`;
const secondaryButtonColor = `${secondaryFull}`;


// Box Shadows
const primaryInsetBoxShadow = 'inset 0px 3.5px 10px rgba(56,56,55, 0.5)';

// JSX Component Colors
// const mainBackground = `${grayFull}`;
const navbarBackground = `#132A61`;
const contentAreadBackground = '#F9FBFF';

// Fonts

const primaryFont = `"Raleway", sans-serif`;
const secondaryFont = "Avenir";
const tabFont = "Avenir";

// Create Theme

const theme = createTheme({
  palette: {
    primary : {
      lt: `${primaryLight}`,
      md: `${primaryMedium}`,
      main: `${primaryFull}`,
    },
    secondary: {
      lt: `${secondaryLight}`,
      md: `${secondaryMedium}`,
      main: `${secondaryFull}`
    },
    grays: {
      lt: `${grayLight}`,
      md: `${grayMedium}`,
      main: `${grayFull}`,
    },
    whites: {
      lt: `${whiteLight}`,
      md: `${whiteMedium}`,
      main: `${whiteFull}`,
    }
  },
  typography: {
    primary: {
      fontFamily: `${primaryFont}`,
      color: `${primaryFontColor}`
    },
    secondary: {
      fontFamily: `${secondaryFont}`,
      color: `${secondaryFontColor}`
    },
    tab: {
      fontFamily: `${tabFont}`,
      color: `${tabPrimaryFontColor}`
    },
    tabSecondary: {
      fontFamily: `${tabFont}`,
      color: `${tabSecondaryFontColor}`,
      opacity: '0.7',
      "&:hover": {
        backgroundColor: `${secondaryMedium}`,
        opacity: '1'
      },
    },
    button: {
      textTransform: 'none'
    }
  },
  boxShadows: {
    inset: {
      boxShadow: `${primaryInsetBoxShadow}`,
    }
  },
  buttons: {
    primary: {
      color: `${primaryButtonTextColor}`,
      transition: '0.4s ease-in-out',
      "&:hover": {
        background: `${primaryButtonColor}`,
      }
    },
    secondary: {
      color: `${secondaryButtonTextColor}`,
      transition: '0.4s ease-in-out',
      "&: hover": {
        background: `${secondaryButtonColor}`
      }
    }
  },
  flexBox: {
    justifyAlignCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    justifyStartAlignCenter: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  },
  toolbars: {
    mobileNav: {
      height: '10dvh',
      backgroundColor: navbarBackground
    },
    desktopNav: {
      backgroundColor: navbarBackground
    },
    mobileTopToolbar: {
      height: '5dvh'
    }
  },
  contentArea: {
    backgroundColor: contentAreadBackground
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `${contentAreadBackground} fixed`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '90dvh',
          maxHeight: '100dvh',
          width: '100%',
          padding: '0'
        },
        html: {
          minHeight: '100%'
        },
        '#root': {
          height: '100dvh'
        },
        // Scrollbar styling for non-mobile screens
        '@media (min-width: 600px)': {
          '*::-webkit-scrollbar': {
            width: '0.5rem'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: `#84A8FF`,
            borderRadius: '1rem',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            width: '2rem',
            height: '2rem',
            cursor: 'pointer'
          },
        },
        '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
          border: 'none',
          padding: 'inherit',
          margin: '0'
        },
        '.MuiToggleButtonGroup-grouped:first-of-type': {
          border: 'none',
          padding: 'inherit',
          margin: '0'
        }
      }
    },
    MuiGrid: {
      item: {
        display: 'flex',
        flexGrow: '1!important',
        flexShrink: '2',
        maxWidth: '100%!important',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    }
    
  }
});

export default theme ;