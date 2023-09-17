import { useEffect } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import MoviesList from '../../components/MoviesList/MoviesList';
import Pagination from '../../components/Pagination/Pagination';
import LoginForm from './../../components/LoginForm/LoginForm';
import RegistrationForm from './../../components/RegistrationForm/RegistrationForm';
import style from './home-styles.module.scss';

const Home = () => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserName,
    setAllMovies,
    showLoginForm,
    showRegistrationForm,
    setTotalPages,
    totalPages
  } = useLoginContext();

  const checkLoggedInStatus = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName")
    if (accessToken) {
      console.log(`${userName} is still logged in`);
      setIsUserLoggedIn(true);
      setUserName(userName)  
    } else { 
      setIsUserLoggedIn(false)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRoles");
      console.log(`No one is logged in`);
    }
  }

  useEffect(() => {
    checkLoggedInStatus()
  })

  useEffect(() => {
    if (isUserLoggedIn) {
      fetch('http://localhost:6969/api/movies/')
      .then((response) => response.json())
      .then((data) => {
        setAllMovies(data.movies)
        setTotalPages(data.totalPages)
      })
    }
  }, [isUserLoggedIn]);

  return (
    <div className={style['container']}>
      {showRegistrationForm && !isUserLoggedIn && <RegistrationForm />}
      {showLoginForm && !isUserLoggedIn && <LoginForm />}
      {isUserLoggedIn &&
        <Pagination />}
      {isUserLoggedIn &&
        <MoviesList />}
    </div>
  )
}

export default Home;