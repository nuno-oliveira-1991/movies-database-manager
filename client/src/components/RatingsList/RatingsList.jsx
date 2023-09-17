import { useLoginContext } from './../../contexts/LoginContext';
import { v4 as uuidv4 } from 'uuid'
import RatingsListItem from './RatingsListItem/RatingsListItem';
import RatingForm from './RatingForm/RatingForm';
import style from './rating-list-styles.module.scss';


const RatingsList = () => {
  const { 
    movie
  } = useLoginContext();

  return (
    <div className={style['container']}>
      <RatingForm />
      <div className={style['ratings-list']}>
        {movie.ratings && 
          movie.ratings.map((rating) => 
            <RatingsListItem 
              key={uuidv4()}
              ratingId={rating._id}
              userName={rating.userName}
              userRating={rating.rating}
              userComment={rating.comment}
            />
          )
        }
      </div>
    </div>
  )
}

export default RatingsList;