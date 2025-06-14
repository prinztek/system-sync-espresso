import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import Franchise from "./pages/Franchise";
import AdminSignin from "./pages/AdminSignin";
import { ToastContainer, toast } from "react-toastify";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [serverProducts, setServerProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProducts();
  }, []);

  // Fetch products from the php backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/php-backend/controllers/ProductController.php",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data); // Handle the products as needed

      setServerProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
    }
  };

  const notify = (text, type) => {
    toast[type](text);
  };

  // Handle Navbar and Footer visibility
  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/admin-signin";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home notify={notify} />} />
        <Route path="franchise" element={<Franchise />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/checkout"
          element={<Checkout products={serverProducts} />}
        />
        <Route path="/cart" element={<Cart products={serverProducts} />} />
        <Route path="/admin-signin" element={<AdminSignin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
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
