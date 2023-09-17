import { useEffect } from 'react';
import { useLoginContext } from './../contexts/LoginContext';

export const useCheckLoggedInStatus = () => {
  const { setIsUserLoggedIn, setUserName } = useLoginContext();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");

    if (accessToken) {
      console.log(`${userName} is logged in`);
      setIsUserLoggedIn(true);
      setUserName(userName);
    } else { 
      setIsUserLoggedIn(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRoles");
      console.log(`No one is logged in`);
    }
  }, [setIsUserLoggedIn, setUserName]);
}