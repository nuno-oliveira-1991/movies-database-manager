import { Link } from "react-router-dom"
import style from './movies-list-item-styles.module.scss'

const MoviesListItem = ({ 
  movieId, 
  movieTitle, 
  moviePosterUrl, 
  movieReleaseDate, 
  movieRatings 
}) => {

  const movieReleaseYear = movieReleaseDate.slice(0, 4);
  const ratings =  movieRatings.map((element) => {return element.rating});
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
  }
  return (
    <Link
      key={`${movieTitle}-${movieId}`}
      style={{ textDecoration: 'none', color: 'gray' }} 
      to={`/${movieId}`}
    >
      <div className={style['container']}>
        <img src={moviePosterUrl} />
        <div>
          <h3>{movieTitle}</h3>
          <span>Released in {movieReleaseYear}</span>
          <span>Rating: {movieRating}</span>
        </div>
      </div>
    </Link>
  )
}

export default MoviesListItem;