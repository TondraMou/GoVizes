import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../components/AuthProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { handleGoogleLogin, handleLogin } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleLogin(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from);
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Invalid email or password");
      });
  };

  const googleLoginHandler = () => {
    handleGoogleLogin()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from);
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <ToastContainer position="top-center" />
      <div className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-[#4E6BFF] font-bold text-center mb-6">Sign in to your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered bg-gray-200 dark:bg-gray-900 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered bg-gray-200 dark:bg-gray-900 w-full"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">
              {error.split("/")[1].split("-").join(" ")}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#4E6BFF] text-white p-3 rounded-lg hover:bg-blue-400"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => navigate(`/reset-password?email=${email}`)}
            className="text-sm hover:underline"
          >
            Forgot Password?
          </button>
          <NavLink
            to="/register"
            className="text-sm hover:underline"
          >
            Don't have an account? Register
          </NavLink>
        </div>
        <div className="divider my-4">OR</div>
        <button
          onClick={googleLoginHandler}
          className="w-full bg-[#4E6BFF] text-white p-3 rounded-lg hover:bg-blue-400"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
