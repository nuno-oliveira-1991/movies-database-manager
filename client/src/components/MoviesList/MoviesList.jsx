import { useLoginContext } from '../../contexts/LoginContext';
import MoviesListItem from './MoviesListItem/MoviesListItem';
import style from './movies-list-styles.module.scss';

const MoviesList = () => {
  const { 
    allMovies
  } = useLoginContext();

  return (
    <div className={style['container']}>
      {allMovies && allMovies.map((movie) => (
        <MoviesListItem
          key={movie._id}
          movieId={movie._id}
          movieTitle={movie.title}
          movieReleaseDate={movie.releaseDate}
          movieRatings={movie.ratings}
          moviePosterUrl={movie.posterUrl}
        />
      ))}
    </div>
  );
};

export default MoviesList;