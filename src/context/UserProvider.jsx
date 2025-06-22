import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginAPI,
  logoutAPI,
  signupAPI,
  checkSession,
} from "../services/AuthService";
import { toast } from "react-toastify";
import { clearCart } from "../services/CartService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  const notify = (text, type) => {
    toast[type](text);
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await checkSession(); // Make an API call to check session status

        if (response.status === "success") {
          // If session is valid, set the user state from the backend response
          setUser(response.user);
        } else {
          // If session is invalid or doesn't exist, reset the user state
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null); // Handle error and reset user state
      }

      setIsReady(true);
    };

    verifySession();
  }, []); // only run on component mount

  const signUpUser = async (email, username, password) => {
    try {
      const response = await signupAPI(email, username, password);
      if (response && response.status === "success") {
        const sessionRes = await checkSession();
        if (sessionRes.status === "success") {
          setUser(sessionRes.user); // Set full user object from status php
          notify("Signup successful!", "success");
          navigate("/");
        } else {
          notify("Signup succeeded but session fetch failed.", "error");
        }
      } else if (response.error) {
        notify("Signup failed. Please check your input.", "error");
      } else {
        notify("Signup failed. Please try again later.", "error");
      }
    } catch (e) {
      console.error(e);
      notify("Signup failed. Please try again.", "error");
    }
  };

  const loginUser = async (email, password, isAdmin = false) => {
    try {
      const response = await loginAPI(email, password, isAdmin);

      if (response.status === "success") {
        const userObject = {
          user_id: response.user.user_id,
          username: response.user.username,
          email: response.user.email,
          created_at: response.user.created_at,
          role: response.user.role, // IMPORTANT
        };

        setUser(userObject);
        notify("Login successful!", "success");

        if (isAdmin) {
          navigate("/admin-dashboard"); // Redirect to admin dashboard if admin
        } else {
          navigate("/");
        }
      } else if (response.error) {
        notify("Invalid email or password!", "error");
      } else {
        notify("Login failed. Please try again later.", "error");
      }
    } catch (e) {
      console.error(e);
      notify("Something went wrong. Please try again later.", "error");
    }
  };

  const isLoggedIn = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      const response = await logoutAPI();
      if (response.status === "success") {
        setUser(null);
        await clearCart(); // clear cart
        notify("Logout successful!", "success");
        navigate("/"); // Redirect to home page or dashboard
      } else {
        console.error("Logout failed:", response.message);
      }
    } catch (e) {
      console.error(e);
      notify("Logout failed. Please try again.", "error");
    }
  };

  return (
    <UserContext.Provider
      // value={{ registerUser, loginUser, user, logout, isLoggedIn }}
      value={{
        user,
        loginUser,
        logoutUser,
        isLoggedIn,
        signUpUser,
        isAdmin,
        isUser,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
