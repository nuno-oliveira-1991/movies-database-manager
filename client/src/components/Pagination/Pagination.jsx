import { useEffect } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import style from './pagination-styles.module.scss'

const Pagination = () => {
  const { 
    setAllMovies,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    userManagementMode,
    setAllUsers
  } = useLoginContext();

  useEffect(() => {
    if (userManagementMode) getAllUsers();
    else getAllMovies();
  }, [currentPage]);
  
  async function getAllUsers() {
    try {
      const response = await fetch(`https://movies-database-manager.fly.dev/api/users?page=${currentPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setTotalPages(data.totalPages);
      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllMovies() {
    try {
      const response = await fetch(`https://movies-database-manager.fly.dev/api/movies?page=${currentPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.ok) console.log(`All movies retrieved successfully`);
      const data = await response.json();
      setTotalPages(data.totalPages);
      setAllMovies(data.movies);
    } catch (error) {
      console.log(error)
    }
  }

  const goToNextPage = async (value) => {
    let pageValue = value + currentPage
    if (pageValue < 1) pageValue = 1
    else if (pageValue > totalPages) pageValue = totalPages
    setCurrentPage(pageValue)
  }

  return (
    <div className={style['pagination']}>
      <button onClick={() => goToNextPage(-1)}>Previous</button>
      <span>Page {currentPage}</span>
      <button onClick={() => goToNextPage(1)}>Next</button>
    </div>
  )
}

export default Pagination;