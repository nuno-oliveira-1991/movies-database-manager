import { useState } from 'react';
import style from './add-movie-form-styles.module.scss';
import { useLoginContext } from './../../contexts/LoginContext';

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [trailerLink, setTrailerLink] = useState('');
  const [genres, setGenres] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [error, setError] = useState('');

  const { 
    addMovieMode,
    setAddMovieMode,
    setMovieManagementMode,
    updateMovieMode,
    setUpdateMovieMode,
    movieToUpdateId
  } = useLoginContext();

  const closeAddMovieForm = () => {
    setAddMovieMode(false);
  };

  const addMovie = async () => {
    try {
      console.log("Initial string : ", genres)
      let genresArray = genres.split(',')
      genresArray = genresArray.map((genre) => {
        console.log(genre.trim().toLowerCase())
        return genre.trim().toLowerCase()
      });
      const response = await fetch("https://movies-database-manager.fly.dev/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, releaseDate, trailerLink, genresArray, posterUrl }),
      });
      if (response.ok) console.log("Movie successfully added to data base")
      setAddMovieMode(false)
      setMovieManagementMode(true)
    } catch (error) {
      console.error("Adding movie to database failed:", error);
      setError("Adding movie to database failed");
    }
  }

  const updateMovie = async () => {
    try {
      let updatedMovie = {}
      if (title !== '') updatedMovie.title = title
      if (releaseDate !== '') updatedMovie.releaseDate = releaseDate
      if (trailerLink !== '') updatedMovie.trailerLink = trailerLink
      if (genres !== '') {
        console.log("Initial string : ", genres)
        let genresArray = genres.split(',')
        genresArray = genresArray.map((genre) => {
          console.log(genre.trim().toLowerCase())
          return genre.trim().toLowerCase()
        });
        updatedMovie.genres = genresArray
        console.log("Genres array : ", updatedMovie.genres)
      }
      if (posterUrl !== '') updatedMovie.posterUrl = posterUrl
      const response = await fetch(`http://localhost:6969/api/movies/${movieToUpdateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      })
      if (response.ok) console.log('Movie updated successfully')
      setUpdateMovieMode(false)
      setMovieManagementMode(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (addMovieMode) {
        addMovie();
        setAddMovieMode(false);
      } else {
        updateMovie();
        setUpdateMovieMode(false)
      }
      
    } catch (error) {
      console.error("Failed to submit your request:", error);
    }
  };

  return (
    <div className={style['container']}>
      <form onSubmit={handleSubmit}>
        <div  className={style['input-fields-container']}>
          <div className={style['form-dividers']}>
            <label htmlFor="title-input">Title</label>
            <input
              type="text"
              id="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={!updateMovieMode}
            />
            <label htmlFor="releaseDate-input">Release Date</label>
            <input
              type="text"
              id="releaseDate-input"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required={!updateMovieMode}
            />
            <label htmlFor="trailerLink-input">Trailer Link</label>
            <input
              type="text"
              id="trailerLink-input"
              value={trailerLink}
              onChange={(e) => setTrailerLink(e.target.value)}
              required={!updateMovieMode}
            />
          </div>
          <div className={style['form-dividers']}>
            <label htmlFor="genres-input">Genres (separated by commas)</label>
            <input
              type="text"
              id="genres-input"
              value={genres}
              onChange={(e) => {setGenres(e.target.value)}}
              required={!updateMovieMode}
            />
            <label htmlFor="posterUrl-input">Poster URL</label>
            <input
              type="text"
              id="posterUrl-input"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              required={!updateMovieMode}
            />  
          </div>
        </div>
        
        <div className={style['form-buttons-container']}>
            <button type="submit" className="btn">
              Submit
            </button>
            <span className="btn" onClick={closeAddMovieForm}>
              Close
            </span>
          </div>
        
        
        
        

        {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AddMovieForm;
