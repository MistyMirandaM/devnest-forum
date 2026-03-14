import { useState } from "react";
import "./App.css";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  if (loggedInUser) {
    return (
      <Dashboard
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        setMessage={setMessage}
      />
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>DevNest</h1>

        <RegisterForm setMessage={setMessage} />

        <div className="divider">or</div>

        <LoginForm
          setMessage={setMessage}
          setLoggedInUser={setLoggedInUser}
        />

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default App;