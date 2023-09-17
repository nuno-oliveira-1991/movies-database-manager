import { useState } from 'react';
import { useLoginContext } from './../../contexts/LoginContext';
import style from './registration-form-styles.module.scss';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    setShowRegistrationForm,
    setUserName
  } = useLoginContext();

  async function register(name, email, password) {
    try {
      if (error !== '') setError('')
      // Clear any previous user information from localStorage
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRoles");

      const response = await fetch("http://localhost:6969/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data[0].message)
        setError(data[0].message);
      } else {
        if (data.accessToken && data.user) {
          const { accessToken, user } = data;
          // Store the access token and user information in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userRoles", user.roles);
          setUserName(user.name)
        }  
        console.log("Registered successfully");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed"); // Set error message
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(name, email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} id="registrationForm">
        <label htmlFor="name-input">Name</label>
        <input
          type="text"
          id="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email-input">Email</label>
        <input
          type="email"
          id="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password-input">Password</label>
        <input
          type="password"
          id="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type="submit" className="btn">Register</button>
          <span className="btn" onClick={() => setShowRegistrationForm(false)}>Close</span>
        </div>
        {error && <p className={style['error']}>{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;