import { Grid, styled } from "@mui/material";

const MainContentArea = styled(Grid)(({theme, drawerWidth}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  minHeight: '75dvh',
  maxHeight: '-webkit-fill-available',
  height: '100%',
  borderRadius: '1.5rem',
  flex: '6',
  width: '100%',
  backgroundColor: `${theme.contentArea.backgroundColor}`,
}));

const InnerContentGrid = styled(Grid)(({theme}) => ({
  width: '100%',
  height: '100%',
}));

export { MainContentArea, InnerContentGrid };