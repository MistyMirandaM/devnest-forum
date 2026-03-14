function Dashboard({ loggedInUser, setLoggedInUser, setMessage }) {

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
    });

    const data = await response.json();
    setLoggedInUser("");
    setMessage(data.message);
  };

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

export default Dashboard;