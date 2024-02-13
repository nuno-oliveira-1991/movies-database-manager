import { useLoginContext } from "../../contexts/LoginContext";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingsList from './../../components/RatingsList/RatingsList';
import style from './movie-detail-styles.module.scss';

const MovieDetail = () => {
  const [movieRating, setMovieRating] = useState("")
  const {
    setIsUserLoggedIn,
    setUserName,
    movie,
    setMovie
  } = useLoginContext()
  
  const { movieId } = useParams()

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
    fetch('https://movies-database-manager.fly.dev/api/movies/')
    .then((response) => response.json())
    .then((data) => {
      let selectedMovie;
      for (let i = 0; i < data.movies.length; i++) {
        if (data.movies[i]._id === movieId) {
          selectedMovie = data.movies[i]
        }
      }
      setMovie(selectedMovie)
    })
  }, []);

  useEffect(() => {
    if (movie) {
      const ratings =  movie.ratings.map((element) => {return element.rating});
      let movieRating
      if (ratings.length === 0) {
        movieRating = "Not Rated"
      } else {
        movieRating = 0;
        for (const rating of ratings) {
          movieRating += rating;
        }
        movieRating = movieRating / ratings.length;
        movieRating = Math.round(movieRating * 10) / 10;
        setMovieRating(movieRating)
      }
    }
  }, [movie]);
  

  return (
    <div className={style['container']}>
      {movie &&
        <>
          <div className={style['movie-info']}>
            <img src={movie.posterUrl} />
            <div className={style['movie-info-title']}>
              <h2>{movie.title}</h2>
              <span><h2>{movieRating}</h2><h5>({movie.ratings.length} ratings)</h5></span>
            </div>
            <div className={style['movie-genres']}>
                {movie.genres.length > 0 &&
                  movie.genres.map((genre, index) => (
                    <span className={style['movie-genre']} key={index}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</span>
                  ))
                }
              </div>
            <a href={movie.trailerLink} className="btn">View Trailer</a>
          </div>
          <RatingsList />
        </>}
    </div>
  )
}

export default MovieDetail;