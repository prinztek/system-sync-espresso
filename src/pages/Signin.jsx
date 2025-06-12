import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/UseAuth";
import { toast } from "react-toastify";

const Signin = () => {
  const { loginUser } = useAuth();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const notify = (text, type) => {
    toast[type](text);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!userCredentials.email || !userCredentials.password) {
      notify("Please fill in both email and password.", "error");
      return;
    }

    try {
      await loginUser(userCredentials.email, userCredentials.password, false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* Logo */}
      <div className="text-center mb-8">
        <NavLink to="/">
          <span className="text-sm sm:text-base font-bold text-gray-800 block -mb-2">
            System Sync
          </span>
          <span className="text-3xl font-bold sm:text-2xl text-black block mt-1">
            Espresso
          </span>
        </NavLink>
      </div>
      <div className="bg-white shadow-md rounded-md border">
        {/* Navigation Bar for Signin and Signup */}
        <nav className="border-b w-full text-black mb-4">
          <ul className="flex justify-around items-center text-center px-2 pt-4 pb-3">
            <li className="w-full">
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "text-amber-600" : "")}
              >
                Sign Up
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? "text-amber-600" : "")}
              >
                Sign In
              </NavLink>
            </li>
          </ul>
        </nav>
        <form className="px-5 pt-3 pb-8">
          <div className="mb-4 ">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-700"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
          </div>
          <button
            onClick={handleSignIn}
            className="w-full bg-amber-600 text-white p-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
