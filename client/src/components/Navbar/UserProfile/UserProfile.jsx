import { useLoginContext } from '../../../contexts/LoginContext';
import { Link } from 'react-router-dom';
import style from './user-profile-styles.module.scss';
import { useEffect } from 'react';

const UserProfile = () => {
  const {
    userName,
    setUserName,
    setIsUserLoggedIn,
    showBackOffice,
    setShowBackOffice,
    backOfficeMode,
    setBackOfficeMode
  } = useLoginContext();

  useEffect(() => {
    const userRoles = localStorage.getItem("userRoles");
    if (userRoles.includes("64e673b9635281f317cb8e00")) setShowBackOffice("true");
  })

  function goToBackOffice() {
    setBackOfficeMode(true);
    console.log('Back-Office mode on');
  }

  const goToHomepage = () => {
    if (backOfficeMode) setBackOfficeMode(false)
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRoles");
    setUserName(undefined);
    setIsUserLoggedIn(false);
    setBackOfficeMode(false);
    if (showBackOffice) setShowBackOffice(false)
    console.log('Logged out successfully');
  }

  return (
    <div className={style['container']}>
      {!backOfficeMode && <span className='btn'>Hello {userName}!</span>}
      {backOfficeMode && 
        <Link 
        to={'/'} 
        style={{ textDecoration: 'none'}}>
          <button className={style['btn']} onClick={goToHomepage}>Homepage</button>
        </Link>}
      {showBackOffice && !backOfficeMode &&
        <Link 
          id={style['back-office-link']} 
          className="btn" 
          to={'/back-office'}
          onClick={goToBackOffice}
        >Back-Office</Link>}
      <Link to={'/'} style={{ textDecoration: 'none'}}>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </Link>
    </div>
  )
}

export default UserProfile;