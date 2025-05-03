import { NavLink } from "react-router-dom";

const Signup = ({ handleSignup, setAuthCredentials, handleInputChange }) => {
  const [user, setUser, confirmPassword, setConfirmPassword] =
    setAuthCredentials;

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
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
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
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-700"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <button
            onClick={handleSignup}
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
