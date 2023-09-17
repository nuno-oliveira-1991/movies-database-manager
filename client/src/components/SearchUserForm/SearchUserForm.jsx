import { useState, useEffect } from 'react';
import { useLoginContext } from './../../contexts/LoginContext';
import style from './search-user-form-styles.module.scss'

const SearchUserForm = () => {
  const [name, setName] = useState('');

  const { 
    allUsers,
    setUserSearchResult
  } = useLoginContext();

  const handleResetClick = () => {
    setName('')
    setUserSearchResult(undefined)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserSearchResult(undefined);
    try {
      const foundUser = allUsers.find((user) => user.name === name);
      if (foundUser) {
        setUserSearchResult([foundUser]);
      } else {
        setUserSearchResult([]);
      }
    } catch (error) {
      console.error("Searching for users failed:", error);
    }
  };

  return (
    <div className={style['container']}>
      <form onSubmit={handleSubmit}>
        <div className={style['input-container']}>
          <span>Search User</span>
          <input
            type="text"
            id="name-input"
            value={name}
            placeholder='Enter user name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div  className={style['buttons-container']}>
          <button type="submit" className={style['form-button']}>
            Submit
          </button>
        </div>
      </form>
        <button className={style['reset-button']} onClick={handleResetClick}>
          RESET
        </button>
    </div>
  );
};

export default SearchUserForm;
