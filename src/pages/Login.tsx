import { useState } from "react";
import { login, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/"); // redirect after login
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
        <button onClick={handleLogout} style={styles.button}>Logout</button>

      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p onClick={() => navigate("/register")} style={styles.link}>
          Don’t have an account? Register
        </p>
      </form>
    </div>
  );
};

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default Login;