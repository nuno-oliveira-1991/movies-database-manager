import style from './ratings-list-item-styles.module.scss';

const RatingsListItem = ({ userName, userRating, userComment }) => {

  return (
    <div className={style['container']}>
      <div className={style['user-info']}>
        <h4>{userName}</h4>
        <h2>{userRating}</h2>
      </div>
      <p>{userComment}</p>
    </div>
  )
}

export default RatingsListItem;