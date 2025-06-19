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

  function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  }

  function validatePasswords() {
    if (newUserCredentials.password !== newUserCredentials.confirmPassword) {
      notify("Passwords do not match.", "warn");
      return false;
    }

    if (!isStrongPassword(newUserCredentials.password)) {
      notify(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        "warn"
      );
      return false;
    }

    return true;
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
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
        <div className="px-5 pb-6 pt-2 text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-1">
            Password must contain:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>At least 8 characters</li>
            <li>At least 1 uppercase letter (A–Z)</li>
            <li>At least 1 lowercase letter (a–z)</li>
            <li>At least 1 number (0–9)</li>
            <li>At least 1 special character (e.g. !@#$%^&*)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
