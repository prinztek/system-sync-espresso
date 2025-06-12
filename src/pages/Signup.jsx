import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import { toast } from "react-toastify";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate(); // to redirect user
  const { signUpUser, setUser } = useAuth();
  const [newUserCredentials, setNewUserCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const notify = (text, type) => {
    toast[type](text);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function validatePasswords() {
    if (newUserCredentials.password !== newUserCredentials.confirmPassword) {
      alert("password does not match");
      return false;
    } else {
      return true;
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      notify("Passwords do not match!", "warn");
      return;
    }

    try {
      // Call the signup API and wait for the response
      const response = await signUpUser(
        newUserCredentials.username,
        newUserCredentials.email,
        newUserCredentials.password
      );
    } catch (error) {
      // Handle any errors from the API call
      console.error(error); // For debugging
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

      <div className=" bg-white shadow-md rounded-md border">
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
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-700"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-700"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-700"
              onChange={handleInputChange}
            />
          </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-amber-600 text-white p-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
