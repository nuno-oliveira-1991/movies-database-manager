import { useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './rating-form-styles.module.scss';

const RatingForm = () => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { movieId } = useParams()

  async function addRating() {
    try {
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");

      const response = await fetch(`http://localhost:6969/api/movies/ratings/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, userEmail, rating, comment }),
      });
      if (!response.ok) {
        setError("Rating submission failed");
      } else {
        console.log("Your Rating was submitted successfully");
      }
    } catch (error) {
      console.error("Rating submission failed:", error);
      setError("Rating submission failed");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submitting...")
      await addRating();
      setRating(1);
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error("Rating submission failed:", error);
    }
  }

  return (
    <div className={style['container']}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating-input">Rating</label>
          <input
            type="number"
            className={style['rating-input']}
            value={rating}
            min="1"
            max="10"
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor="comment-input">Comment</label>
          <input
            type="text"
            className={style['comment-input']}
            value={comment}
            minLength="3"
            maxLength="50"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Rate</button>
      </form>
    </div>
  )
}

export default RatingForm;