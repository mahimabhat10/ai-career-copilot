import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
     role: "user",
  });
  

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful!");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-8 rounded-2xl bg-[#12121a] border border-white/10"
      >
        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black/30 border border-white/10"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black/30 border border-white/10"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black/30 border border-white/10"
        />
<select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className="w-full p-3 mb-4 rounded bg-black/30 border border-white/10"
>
  <option value="user">User</option>
</select>
        <button
          type="submit"
          className="w-full py-3 rounded bg-violet-600 hover:bg-violet-700"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-cyan-400"
          >
            Login
          </Link>
        </p>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Signup;