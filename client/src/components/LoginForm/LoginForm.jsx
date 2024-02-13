import { useState } from 'react';
import { useLoginContext } from './../../contexts/LoginContext';
import style from './login-form-styles.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    setShowLoginForm,
    setUserName,
    setIsUserLoggedIn,
    setShowBackOffice
  } = useLoginContext();

  async function login() {
    try {
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRoles");
      setShowBackOffice(false)
      setIsUserLoggedIn(false);
      setUserName(undefined)

      const response = await fetch("https://movies-database-manager.fly.dev/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data[0].message)
        setError(data[0].message)
      } else {
        if (data.accessToken && data.user) {
          const { accessToken, user } = data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userRoles", user.roles);
          setIsUserLoggedIn(true);
          setUserName(user.name);
          setShowLoginForm(false);
          console.log("Logged in successfully");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Login failed");
    } 
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login();
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={style['container']}>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn">Login</button>
          <span className="btn" onClick={() => setShowLoginForm(false)}>Close</span>
        </div>

        {error && <p className={style['error']}>{error}</p>}
      </form>
    </div>
  ); 
};

export default LoginForm;