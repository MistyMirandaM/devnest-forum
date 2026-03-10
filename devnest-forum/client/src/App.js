import { useState } from "react";
import "./App.css";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
      }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (data.message === "Login successful") {
      setLoggedInUser(loginUsername);
    }
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
    });

    const data = await response.json();
    setLoggedInUser("");
    setMessage(data.message);
  };

  if (loggedInUser) {
    return (
      <div className="container">
        <div className="card">
          <h1>DevNest Dashboard</h1>
          <p className="message">Welcome, {loggedInUser}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>DevNest</h1>

        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Create username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>

        <div className="divider">or</div>

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default App;