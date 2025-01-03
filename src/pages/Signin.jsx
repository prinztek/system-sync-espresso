import { NavLink } from "react-router-dom";

const Signin = ({ handleLogin, setAuthCredentials, handleInputChange }) => {
  const [user, setUser] = setAuthCredentials;

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
      <div className="bg-white shadow-md rounded-md">
        {/* Navigation Bar for Signin and Signup */}
        <nav className="border-b w-full text-black mb-4">
          <ul className="flex justify-around items-center text-center px-2 pt-4 pb-3">
            <li className="w-full">
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                Sign Up
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
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
              value={user.email}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
