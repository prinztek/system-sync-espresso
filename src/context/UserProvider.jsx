import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, logoutAPI, signupAPI } from "../services/AuthService";

export const UserContext = createContext();

const defaultUserObject = {
  id: "",
  username: "",
  email: "",
  created_at: "",
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(defaultUserObject);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }

    setIsReady(true);
  }, []);

  const signUpUser = async () => {
    try {
      const res = await signupAPI(email, username, password);

      if (res) {
        const userObject = {
          user_id: res.user_id,
          username: res.username,
          email: res.email,
          created_at: res.created_at,
        };

        setUser(userObject);
        console.log("Registration Success!");

        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loginUser = async () => {
    try {
      const response = await loginAPI(email, password);

      if (response.status === "success") {
        const userObject = {
          id: response.user.user_id,
          username: response.user.username,
          email: response.user.email,
          created_at: response.user.created_at,
        };

        setUser(userObject);
        console.log("Login Success!");
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isLoggedIn = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await logoutAPI();
      if (response.status === "success") {
        setUser(null);
        notify("Logout successful!", "success");
        navigate("/"); // Redirect to home page or dashboard
      } else {
        notify("Logout unsuccessful. Please try again.", "error");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserContext.Provider
      // value={{ registerUser, loginUser, user, logout, isLoggedIn }}
      value={{ loginUser, user, logout, isLoggedIn, signUpUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
