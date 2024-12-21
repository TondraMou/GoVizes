import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../components/AuthProvider/AuthProvider";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const { user, handleLogout } = useContext(authContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div className="w-full mx-auto">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#4E6BFF] font-bold underline" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/all-visas"
                className={({ isActive }) =>
                  isActive ? "text-[#4E6BFF] font-bold underline" : ""
                }
              >
                All Visas
              </NavLink>
              <NavLink
                to="/add-visa"
                className={({ isActive }) =>
                  isActive ? "text-[#4E6BFF] font-bold underline" : ""
                }
              >
                Add Visa
              </NavLink>
              <NavLink
                to="/my-added-visas"
                className={({ isActive }) =>
                  isActive ? "text-[#4E6BFF] font-bold underline" : ""
                }
              >
                My Added Visas
              </NavLink>
              <NavLink
                to="/my-visa-applications"
                className={({ isActive }) =>
                  isActive ? "text-[#4E6BFF] font-bold underline" : ""
                }
              >
                My Visa Applications
              </NavLink>
            </ul>
          </div>
          <a className="btn btn-ghost text-lg lg:text-2xl text-[#4E6BFF]">
            GoVizes
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#4E6BFF] font-bold underline" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-visas"
              className={({ isActive }) =>
                isActive ? "text-[#4E6BFF] font-bold underline" : ""
              }
            >
              All Visas
            </NavLink>
            <NavLink
              to="/add-visa"
              className={({ isActive }) =>
                isActive ? "text-[#4E6BFF] font-bold underline" : ""
              }
            >
              Add Visa
            </NavLink>
            <NavLink
              to="/my-added-visas"
              className={({ isActive }) =>
                isActive ? "text-[#4E6BFF] font-bold underline" : ""
              }
            >
              My Added Visas
            </NavLink>
            <NavLink
              to="/my-visa-applications"
              className={({ isActive }) =>
                isActive ? "text-[#4E6BFF] font-bold underline" : ""
              }
            >
              My Visa Applications
            </NavLink>
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-xl">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-[#4E6BFF]">
                Sign In
              </NavLink>
              <NavLink to="/register" className="hover:text-[#4E6BFF]">
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="relative flex items-center space-x-2 group">
              <div className="relative">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
                <div className="absolute bottom-0 left-0 w-full text-center bg-white text-black rounded-b-md p-2 hidden group-hover:block">
                  <p className="text-sm">{user.displayName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSignOut}
                  className="text-[#4E6BFF] hover:text-blue-400 font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;