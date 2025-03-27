import { useMediaQuery } from "@mui/material";

export default function MobileView(){

  const isMobileMdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isMobileSmDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  
  return {
    sm: isMobileSmDown,
    md: isMobileMdDown
  };
};