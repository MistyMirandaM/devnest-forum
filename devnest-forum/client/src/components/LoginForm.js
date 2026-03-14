import { useState } from "react";

function LoginForm({ setMessage, setLoggedInUser }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  return (
    <>
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
    </>
  );
}

export default LoginForm;