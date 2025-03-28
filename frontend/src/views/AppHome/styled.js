import { Grid, styled } from "@mui/material";

const ParentContainer = styled(Grid)(({theme}) => ({
  ...theme.flexBox.justifyAlignCenter,
  flexDirection: 'column',
  maxHeight: '90dvh',
  width: '100%',
  flexWrap: 'nowrap',
}));

export { ParentContainer }