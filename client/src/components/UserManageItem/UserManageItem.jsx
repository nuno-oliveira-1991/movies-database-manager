import { useLoginContext } from '../../contexts/LoginContext';
import style from './user-manage-item.module.scss';

const UserManageItem = ({ userId, userName, userEmail, userRoles }) => {
  const {
    setUpdateUserMode,
    setUserToUpdateId
  } = useLoginContext();

  let userMainRole;
  if (userRoles.includes('64e673b9635281f317cb8e00')) userMainRole = 'Admin'
  else userMainRole = 'User'

  const handleUpdateUser = async () => {
    try {
      setUpdateUserMode(true)
      setUserToUpdateId(userId)
      console.log('Update user mode on')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      const userAccessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:6969/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAccessToken}`
        },
      })
      if (response.ok) console.log('User deleted successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style['container']}>
      <h5>{userName}</h5>
      <span className={style['user-email']}>{userEmail}</span>
      <span className={style['user-role']}>{userMainRole}</span>
      <div >
        
        {userMainRole !== 'Admin' &&
          <>
            <button onClick={handleUpdateUser}>Update</button>
            <button  onClick={handleDeleteUser}>Delete</button>
          </>}
      </div>
    </div>
  )
}

export default UserManageItem;