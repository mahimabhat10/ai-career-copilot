import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginSuccess } from "../redux/authSlice";
import { loginSchema } from "../validations/authSchema";
import api from "../api/axios";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

      const handleLogin = async (data) => {
  try {

    const validation = loginSchema.safeParse(data);

   
const response = await api.post(
  "/login",
  data
);

const result = response.data;
    

      if (result.token) {
        localStorage.setItem("token", result.token);

        localStorage.setItem(
          "user",
          JSON.stringify(result.user)
        );

        dispatch(
          loginSuccess({
            user: result.user,
            token: result.token,
          })
        );

        navigate("/dashboard");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md p-8 rounded-2xl bg-[#12121a] border border-white/10"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full p-3 mb-2 rounded bg-black/30 border border-white/10"
        />

        {errors.email && (
          <p className="text-red-400 text-sm mb-3">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full p-3 mb-2 rounded bg-black/30 border border-white/10"
        />

        {errors.password && (
          <p className="text-red-400 text-sm mb-3">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded bg-violet-600 hover:bg-violet-700"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400"
          >
            Sign Up
          </Link>
        </p>

        {message && (
          <p className="mt-4 text-center text-red-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;