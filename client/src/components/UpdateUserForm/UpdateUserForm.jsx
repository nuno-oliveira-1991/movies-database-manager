import { useState } from 'react';
import { useLoginContext } from './../../contexts/LoginContext';
import style from './update-user-form.module.scss'

const UpdateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState('');
  const [error, setError] = useState('');

  const { 
    setUserManagementMode,
    userToUpdateId,
    setUpdateUserMode
  } = useLoginContext();

  const closeUpdateUserForm = () => {
    setUpdateUserMode(false);
  };

  const updateUser = async () => {
    try {
      let updatedUser = {}
      if (name !== '') updatedUser.name = name
      if (email !== '') updatedUser.email = email
      if (roles !== '') {
        const rolesInputArray = roles.split(',');
        const rolesOutputArray = rolesInputArray.map((role) => {
          return `${role.charAt(0).toUpperCase()}${role.slice(1)}`
        })
        updatedRoles.roles = rolesOutputArray
      }
      const userAccessToken = localStorage.getItem("accessToken");
      const response = await fetch(`https://movies-database-manager.fly.dev/api/users/${userToUpdateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userAccessToken}`
        },
        body: JSON.stringify(updatedUser),
      })
      if (response.ok) console.log('User updated successfully')
      setUpdateUserMode(false)
      setUserManagementMode(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateUser();
      setUpdateUserMode(false);
    } catch (error) {
      console.error("Failed to submit your request:", error);
    }
  };

  return (
    <div className={style['container']}>
      <form onSubmit={handleSubmit}>
        <div  className={style['input-fields-container']}>
          <div className={style['form-dividers']}>
            <label htmlFor="title-input">Name</label>
            <input
              type="text"
              id="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email-input">Email</label>
            <input
              type="text"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="roles-input">Roles</label>
            <input
              type="text"
              id="roles-input"
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
            />
          </div>
        </div>   
        <div className={style['form-buttons-container']}>
          <button type="submit" className="btn">
            Submit
          </button>
          <span className="btn" onClick={closeUpdateUserForm}>
            Close
          </span>
        </div>
       {error && <p className={style.error}>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateUserForm;
