import { NavLink } from "react-router-dom";
import { loginAPI, signupAPI } from "../services/AuthService";

const AdminSignin = ({ setAuthCredentials, handleInputChange }) => {
  const [user, setUser] = setAuthCredentials;

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem(user.email);

    if (!savedUser) {
      notify("Account does not exist!", "warn");
      return;
    }

    const retrievedUser = JSON.parse(savedUser);
    if (user.password === retrievedUser.password) {
      notify("Logged in successfully", "success");

      setIsLoggedIn(true);
      setUser(retrievedUser);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("loggedInUserEmail", user.email);
      navigate("/"); // Redirect to Home
      return;
    }

    alert("The password you've entered is incorrect.");
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
        <form className="px-5 pt-3 pb-8">
          <div className="mb-4 ">
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
              value={user.password}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-amber-600 text-white p-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignin;
