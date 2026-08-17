import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = existingUsers.find(
      (user) => user.email === form.email
    );

    if (alreadyExists) {
      setError("Email already registered");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...existingUsers, newUser])
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: newUser.name,
        email: newUser.email,
      })
    );

    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>Learniee</h1>

        <h2>Create Account</h2>

        <p>Create your parent account</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">
          Create Account
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;