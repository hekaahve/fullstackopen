import React from "react";
import loginService from "../services/login";
//TODO: refactor login form to own component
const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={setUsername}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={setPassword}
      />
    </div>
    <button type="submit">login</button>
  </form>
);
export default LoginForm;
