import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../pages/styledpages.css";
export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="auth">
      {isLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Register toggleForm={toggleForm} />
      )}
    </div>
  );
};

const Login = ({ toggleForm }) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [_, setCookies] = useCookies("access_token");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to your login endpoint
      const response = await axios.post("http://localhost:5555/auth/login", {
        username: loginUsername,
        password: loginPassword,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
      // You can do something after successful login, such as redirecting to another page or showing a success message.
      alert("Login Successful!"); // You can replace this with your desired behavior.
    } catch (error) {
      console.error(error);
      // Example: setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="auth-Container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="loginUsername">Username:</label>
          <input
            type="text"
            value={loginUsername}
            id="loginUsername"
            onChange={(event) => setLoginUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            value={loginPassword}
            id="loginPassword"
            onChange={(event) => setLoginPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <button onClick={toggleForm}>Register</button>
      </p>
    </div>
  );
};

const Register = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to your registration endpoint
      await axios.post("http://localhost:5555/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Login");
    } catch (error) {
      console.error(error); // Correct the variable name to 'error'
      // You can also handle the error in a more user-friendly way, e.g., display a message to the user.
      // Example: setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-Container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={toggleForm}>Login</button>
      </p>
    </div>
  );
};
