import { useEffect, useState } from 'react';
import { useCheckLoggedInStatus } from '../../Hooks/useCheckLoggedInStatus';
import { useLoginContext } from '../../contexts/LoginContext';
import { v4 as uuidv4 } from 'uuid';
import UserManageItem from '../../components/UserManageItem/UserManageItem';
import MovieManageItem from '../../components/MovieManageItem/MovieManageItem';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import SearchUserForm from '../../components/SearchUserForm/SearchUserForm';
import UpdateUserForm from './../../components/UpdateUserForm/UpdateUserForm';
import Pagination from './../../components/Pagination/Pagination'
import style from './back-office.styles.module.scss';

const BackOffice = () => {
  const [filters, setFilters] = useState({
    filterBy: '',
    title: '',
    year: '',
    rating: '',
    genres: '',
  });
  const {
    setBackOfficeMode,
    addMovieMode,
    setAddMovieMode, 
    allMovies,
    allUsers,
    setAllUsers,
    movieManagementMode,
    setMovieManagementMode,
    userManagementMode,
    setUserManagementMode,
    updateMovieMode,
    setUpdateMovieMode,
    updateUserMode,
    userSearchResult,
    setUserSearchResult,
    filteredMovies,
    setFilteredMovies,
    setTotalPages
  } = useLoginContext();

  useEffect(() => {
    setBackOfficeMode(true);
    setAddMovieMode(false);
    setUpdateMovieMode(false);
    fetch('http://localhost:6969/api/users/')
    .then((response) => response.json())
    .then((data) => {
      setAllUsers(data.users)
      setTotalPages(data.totalPages)
    })
  }, []);

  useCheckLoggedInStatus();

  const handleManageMoviesClick = async () => {
    if (userSearchResult) setUserSearchResult(undefined);
    if (userManagementMode) setUserManagementMode(false);
    if (updateMovieMode) setUpdateMovieMode(false);
    if (addMovieMode) setAddMovieMode(false);
    setMovieManagementMode(true);
    console.log('Movie management mode on');
  };

  const handleManageUsersClick = async () => {
    if (filteredMovies) setFilteredMovies(undefined);
    if (movieManagementMode) setMovieManagementMode(false);
    if (addMovieMode) setAddMovieMode(false);
    if (updateMovieMode) setUpdateMovieMode(false);
    setUserManagementMode(true);
    console.log('User management mode on');
  };

  const handleAddMovieClick = async () => {
    if (updateMovieMode) setUpdateMovieMode(false);
    if (filteredMovies) setFilteredMovies(undefined);
    setAddMovieMode(true);
    console.log('Add movie mode on');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (addMovieMode) setAddMovieMode(false);
    let results;
    if (filters.filterBy === 'title') {
      results = allMovies.filter((movie) => {
        const normalizedTitle = movie.title.toLowerCase();
        const normalizedFilter = filters.title.toLowerCase();
        return normalizedTitle.includes(normalizedFilter);
      });
    }
    else if (filters.filterBy === 'year') results = allMovies.filter((movie) => {
      if (filters.year === movie.releaseDate.slice(0, 4)) return movie
    })
    else if (filters.filterBy === 'genres') {
      let selectedGenres = filters.genres.split(/[,;\s]+/);
      results = allMovies.filter((movie) => 
        movie.genres.some((genre) => selectedGenres.includes(genre))
      );
    }
    else if (filters.filterBy === 'rating') {
      results = allMovies.filter((movie) => {
        let movieRating = 0;
        let ratingsArray = movie.ratings.map((rating) => rating.rating)
        for (const rating of ratingsArray) {
          movieRating += rating;
        }
        movieRating = movieRating / ratingsArray.length;
        movieRating = Math.round(movieRating);
        if (movieRating === Number(filters.rating)) return movie
      })
    }
    else {results = allMovies}
    setFilteredMovies(results)
  };

  return (
    <div className={style['container']}>
      <nav>
        <div className={style['manage-menu']}>
          <button 
          className='btn' 
          onClick={handleManageMoviesClick} 
          style={
            { backgroundColor: movieManagementMode ? 
              'rgba(160, 160, 160, 1)' : 'lightgray' }}>
          Manage Movies
          </button>
          <button 
            className='btn' 
            onClick={handleManageUsersClick}
            style={
            { backgroundColor: userManagementMode ? 
              'rgba(160, 160, 160, 1)' : 'lightgray' }}>
          Manage Users</button>
        </div>
        {movieManagementMode &&
          <div className={style['tools-menu']}>
            <form onSubmit={handleFilterSubmit}>
              <select
                name="filterBy"
                value={filters.filterBy}
                onChange={handleInputChange}
              >
                <option value="">-- Filter By --</option>
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
                <option value="genres">Genres</option>
              </select>

              {/* Conditional rendering of input fields based on the selected filter */}
              {filters.filterBy && (
                <input
                  type={filters.filterBy === 'rating' ? 'number' : 'text'}
                  name={filters.filterBy}
                  placeholder={`Enter movie ${
                    filters.filterBy === 'year' ? 'year' : filters.filterBy
                  }`}
                  value={filters[filters.filterBy] || ''}
                  onChange={handleInputChange}
                  min={filters.filterBy === 'rating' ? '1' : undefined}
                  max={filters.filterBy === 'rating' ? '10' : undefined}
                  maxLength={filters.filterBy === 'year' ? '4' : '15'}
                  pattern={filters.filterBy === 'year' ? '\\d{4}' : undefined}
                />
              )}
              <div>
                <button  className={style['form-button']} type="submit">Apply</button>
              </div>
            </form>
            <button button className={style['reset-button']} onClick={() => {
              setFilteredMovies(allMovies);
              setFilters({
                filterBy: '',
                title: '',
                year: '',
                rating: '',
                genres: '',
              })
            }}>
              RESET
            </button>
            <button 
              className={style['add-movie-button']} 
              type="button"
              onClick={handleAddMovieClick} 
            >
              ADD MOVIE
            </button>
          </div>
        }
        {userManagementMode &&
          <SearchUserForm />
        }
      </nav>
      {userManagementMode && <Pagination />}
      {movieManagementMode && <Pagination />}
      <div className={style['results-list']}>
        {userManagementMode && userSearchResult && userSearchResult.length === 0 &&
          <p>No users were found.</p>
        }
        {movieManagementMode && filteredMovies && filteredMovies.length === 0 &&
          <p>No movies were found.</p>
        }
        {
          console.log('allUsers type:', typeof allUsers)
        }
        {
          console.log('allUsers content:', allUsers)
        }
        {allUsers && 
          userManagementMode && 
          !updateUserMode &&
          !userSearchResult &&
            allUsers.map((user) => (
              <UserManageItem
                key={uuidv4()}
                userId={user._id}
                userName={user.name}
                userEmail={user.email}
                userRoles={user.roles}
              />)
            )
        }
        { userSearchResult &&
          userSearchResult.map((user) => (
            <UserManageItem 
              key={uuidv4()}
              userId={user._id}
              userName={user.name}
              userEmail={user.email}
              userRoles={user.roles}
            />)
          )
        }
        {allMovies && 
          movieManagementMode && 
          !addMovieMode && 
          !updateMovieMode &&
          !filteredMovies &&
            allMovies.map((movie) => (
              <MovieManageItem 
                key={uuidv4()}
                movieId={movie._id}
                movieTitle={movie.title}
                movieGenres={movie.genres}
              />)
            )
        }
        {filteredMovies &&
          filteredMovies.map((movie) => (
            <MovieManageItem 
              key={uuidv4()}
              movieId={movie._id}
              movieTitle={movie.title}
            />)
          )
        }
        {addMovieMode &&
          <AddMovieForm />
        }
        {updateMovieMode &&
          <AddMovieForm />
        }
        {updateUserMode &&
          <UpdateUserForm />
        }
      </div>
    </div>
  )
}

export default BackOffice;