import { useLoginContext } from '../../contexts/LoginContext';
import style from './movie-manage-item.module.scss';

const MovieManageItem = ({ movieId, movieTitle, movieGenres }) => {
  const {
    setUpdateMovieMode,
    setMovieToUpdateId
  } = useLoginContext()

  const handleUpdateMovie = async () => {
    try {
      setUpdateMovieMode(true)
      setMovieToUpdateId(movieId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteMovie = async () => {
    try {
      const response = await fetch(`https://movies-database-manager.fly.dev/api/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) console.log('Movie deleted successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style['container']}>
      <h5>{movieTitle}</h5>
      <span>{'id  :  ' + movieId}</span>
      <div >
        <button onClick={handleUpdateMovie}>Update</button>
        <button onClick={handleDeleteMovie}>Delete</button>
      </div>
    </div>
  )
}

export default MovieManageItem;