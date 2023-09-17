import logo from './../../assets/icons/icons8-film-reel-64.png';
import { Link } from 'react-router-dom';
import { useLoginContext } from '../../contexts/LoginContext';
import UserProfile from './UserProfile/UserProfile';
import style from './navbar-styles.module.scss'

const NavBar = () => {
  const {
    isUserLoggedIn,
    showRegistrationForm,
    setShowRegistrationForm,
    showLoginForm,
    setShowLoginForm,
    backOfficeMode,
    setBackOfficeMode
  } = useLoginContext();

  const openLoginForm = () => {
    if (showRegistrationForm) setShowRegistrationForm(false)
    setShowLoginForm(true)  
  }

  const openRegistrationForm = () => {
    if (showLoginForm) setShowLoginForm(false)
    setShowRegistrationForm(true)  
  }

  const goToHomepage = () => {
    if (backOfficeMode) setBackOfficeMode(false)
  }

  return (
    <div className={style['container']}>
      <nav>
        <Link
          className={style['logo-container']}
          to={`/`}
          onClick={goToHomepage}
        >
          <img src={logo} />
          <h2>Rate Your Movies</h2>
        </Link>
        {isUserLoggedIn && <UserProfile />}
        {!isUserLoggedIn && 
          <div className={style['menu']}>
          <button className="btn" onClick={openLoginForm}>Login</button>
          <button className="btn" onClick={openRegistrationForm}>Register</button>
        </div>}
      </nav> 
    </div>
    
  )
}

export default NavBar;