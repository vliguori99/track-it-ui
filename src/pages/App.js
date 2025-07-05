import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./App.css";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

function App() {
  const { authData } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/register" style={{ margin: "10px" }}>
              Sign up!
            </Link>
            <Link to="/login" style={{ margin: "10px" }}>
              Login
            </Link>
          </nav>
          <h1>Track-It</h1>
          {/* Show user name if is logged in */}
          {authData && <h2>Welcome, {authData.username}!</h2>}
        </header>

        <main>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Add other routes here...*/}
            <Route path="/" element={<h2>Home</h2>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
