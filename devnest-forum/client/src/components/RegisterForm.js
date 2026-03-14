import { useState } from "react";

function RegisterForm({ setMessage }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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

  return (
    <>
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
    </>
  );
}

export default RegisterForm;