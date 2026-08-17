import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>Learniee</h1>

        <h2>Welcome Back</h2>

        <p>Login to your parent dashboard</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;