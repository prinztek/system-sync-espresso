import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import Franchise from "./pages/Franchise";
import { ToastContainer, toast } from "react-toastify";

const defaultUserObject = { email: "", password: "", cart: [] };

function App() {
  // for newsletter subscription
  const [newsLetterEmail, setNewsLetterEmail] = useState("");
  const notify = (text, type) => {
    toast[type](text);
  };

  const submitEmail = () => {
    if (!newsLetterEmail.trim()) {
      notify("Please enter a valid email address.", "error");
      return;
    }

    notify(
      "Thank you for subscribing to our newsletter! Stay tuned for updates.",
      "success"
    );
    setNewsLetterEmail(""); // Clear input field after successful submission
  };

  const navigate = useNavigate(); // to redirect user
  const [user, setUser] = useState(() => {
    const savedEmail = localStorage.getItem("loggedInUserEmail");
    return savedEmail
      ? JSON.parse(localStorage.getItem(savedEmail)) || defaultUserObject
      : defaultUserObject;
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true"; // Check if user is already logged in
  });

  // udpate localStorage
  useEffect(() => {
    if (isLoggedIn) {
      console.log("update user in localStorage ");

      localStorage.setItem(user.email, JSON.stringify(user)); // Update localStorage
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      notify("Passwords do not match!", "warn");

      return;
    }
    // Check if the email is already in use
    const existingUser = localStorage.getItem(user.email);
    if (existingUser) {
      notify(
        "This email is already registered. Try Logging in instead.",
        "warn"
      );
      return;
    }

    // Save the user to localStorage
    localStorage.setItem(user.email, JSON.stringify(user));
    notify("Account created successfully!", "success");

    setConfirmPassword(""); // Clear confirm password field

    // log in the user after successful signup
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedInUserEmail", user.email);

    navigate("/"); // Redirect to Home
  };

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

  const handleLogout = () => {
    notify("Logged out successfully", "success");
    setUser(defaultUserObject);
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUserEmail");
    localStorage.setItem("loggedIn", "false"); // Clear login status
    navigate("/");
  };

  const handleAddToCart = (product, size, price) => {
    if (!isLoggedIn) {
      notify("Create an account first", "info");
      navigate("/signin");
      return;
    }

    const existingProduct = user.cart.find(
      (item) => item.id === product.id && item.size_options === size
    );

    let updatedCart;
    if (existingProduct) {
      notify("Product already added to cart, added 1 to quantity", "success");
      console.log("Product already added to cart"); // add 1 to quantity
      updatedCart = user.cart.map((item) =>
        item.id === existingProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      notify("Product added to cart", "success");
      console.log("product added to cart");
      updatedCart = [
        ...user.cart,
        { ...product, size_options: size, price: price, quantity: 1 },
      ];
    }
    const updatedUser = { ...user, cart: updatedCart };
    setUser(updatedUser);
    localStorage.setItem(user.email, JSON.stringify(updatedUser)); // Update localStorage
  };

  const handleRemoveFromCart = (id, size) => {
    notify("Product removed from cart", "success");
    const updatedCart = user.cart.filter(
      (item) => !(item.id === id && item.size_options === size)
    );
    const updatedUser = { ...user, cart: updatedCart };
    setUser(updatedUser);
    localStorage.setItem(user.email, JSON.stringify(updatedUser)); // Update localStorage
  };

  const handleQuantityChange = (id, quantity, size) => {
    let updatedCart = user.cart.map((item) =>
      item.id === id && item.size_options === size
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );

    const updatedUser = { ...user, cart: updatedCart };
    setUser(updatedUser);
    localStorage.setItem(user.email, JSON.stringify(updatedUser)); // Update localStorage
  };

  // Handle Navbar and Footer visibility
  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarFooter && (
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          setAuthCredentials={[user, setUser]}
          cart={user.cart}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleAddToCart={handleAddToCart}
              submitEmail={submitEmail}
              newsLetterEmail={newsLetterEmail}
              setNewsLetterEmail={setNewsLetterEmail}
            />
          }
        />
        <Route path="franchise" element={<Franchise />} />
        <Route
          path="/menu"
          element={<Menu handleAddToCart={handleAddToCart} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/signup"
          element={
            <Signup
              handleSignup={handleSignup}
              handleInputChange={handleInputChange}
              setAuthCredentials={[user, setUser, confirmPassword]}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Signin
              handleLogin={handleLogin}
              handleInputChange={handleInputChange}
              setAuthCredentials={[user, setUser]}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              user={user}
              cart={user.cart}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleQuantityChange={handleQuantityChange}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
