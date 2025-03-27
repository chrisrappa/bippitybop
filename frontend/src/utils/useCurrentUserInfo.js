import { useSelector } from "react-redux";

const useCurrentUserInfo = () => {
  const currentUserInfo = useSelector((state) => state?.userData?.loginInfo);
  return currentUserInfo;
};

export default useCurrentUserInfo;