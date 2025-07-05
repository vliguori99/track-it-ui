import React, { useState } from "react";
import authService from "../services/authService";

const RegisterPage = () => {
  // Use the react state in order to track input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // this function gets called whenever the user sends the form
  const handleRegister = async (e) => {
    e.preventDefault(); // prevents the browser from reloading the page

    try {
      // create the Dto with values retrieved from the state
      const registerDto = { username, password };
      // call the service function
      const response = await authService.register(registerDto);

      setMessage(`Registration success! Welcome, ${response.username}`);
    } catch (error) {
      // if there is an error, shows it
      setMessage(
        "an error occurred during registration process. Please retry."
      );
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {/* Show here the success/fail message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;