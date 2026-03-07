const API = "http://localhost:5050/api";

const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const dashboardView = document.getElementById("dashboardView");

const loginError = document.getElementById("loginError");
const registerError = document.getElementById("registerError");

const welcomeText = document.getElementById("welcomeText");

function show(view) {
  loginView.classList.add("hidden");
  registerView.classList.add("hidden");
  dashboardView.classList.add("hidden");
  view.classList.remove("hidden");
}

async function api(path, method, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

async function loadMe() {
  try {
    const data = await api("/me", "GET");
    welcomeText.textContent = `Welcome, ${data.user.username}`;
    show(dashboardView);
  } catch {
    show(loginView);
  }
}

document.getElementById("goRegister").addEventListener("click", (e) => {
  e.preventDefault();
  loginError.textContent = "";
  show(registerView);
});

document.getElementById("goLogin").addEventListener("click", (e) => {
  e.preventDefault();
  registerError.textContent = "";
  show(loginView);
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  loginError.textContent = "";
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const data = await api("/login", "POST", { username, password });
    welcomeText.textContent = `Welcome, ${data.user.username}`;
    show(dashboardView);
  } catch (err) {
    loginError.textContent = err.message || "Login failed.";
  }
});

document.getElementById("registerBtn").addEventListener("click", async () => {
  registerError.textContent = "";
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirm").value;
  const acceptedTerms = document.getElementById("regTerms").checked;

  try {
    const data = await api("/register", "POST", {
      username,
      password,
      confirmPassword,
      acceptedTerms
    });
    welcomeText.textContent = `Welcome, ${data.user.username}`;
    show(dashboardView);
  } catch (err) {
    registerError.textContent = err.message || "Register failed.";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await api("/logout", "POST");
  show(loginView);
});

loadMe();
