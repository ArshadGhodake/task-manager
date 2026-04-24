import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      setMessage("Enter email & password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/tasks");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={login}>Login</button>

      <br /><br />

      <button onClick={() => navigate("/signup")}>
        Go to Signup
      </button>

      <p>{message}</p>
    </div>
  );
}

export default Login;