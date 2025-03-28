import { Grid, Paper, styled } from "@mui/material";


const ContainerParentGrid = styled(Grid)(({theme}) => ({
  display: 'flex',
  width: '100%',
  minHeight: '90dvh',
  height: '100%',
  overflow: 'scroll',
  padding: '0.5rem'
}));

const ParentGrid = styled(Paper)(({theme}) => ({
  display: 'flex',
  width: '100%',
  height: '10rem',
  padding: '0.5rem',
  marginBottom: '1rem',
  backgroundColor: `${theme.palette.secondary.main}`, 
}));

const InnerGridBackgroundContainer = styled(Grid)(({theme}) => ({
  width: '100%', 
  height: '100%', 
  borderRadius: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'nowrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const DocumentContentGrid = styled(Grid)(({theme}) => ({
  flex: '2',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderRadius: '1rem',
  paddingLeft: '1rem'
}));

const GoToFileGrid = styled(Grid)(({theme}) => ({
  flex: '1',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '1rem',
  marginTop: '2rem',
  alignItems: 'flex-start',
  borderRadius: '1rem',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '0'
  }
}));

const FolderEditGrid = styled(Grid)(({theme}) => ({
  flex: '1',
  height: '100%'
}));

const DocumentListGrid = styled(Grid)(({theme}) => ({
  flex: '3',
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '1rem'
}));

export {
  ParentGrid,
  InnerGridBackgroundContainer,
  DocumentContentGrid,
  GoToFileGrid,
  FolderEditGrid,
  DocumentListGrid,
  ContainerParentGrid
}