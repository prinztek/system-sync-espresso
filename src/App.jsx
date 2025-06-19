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
import { ToastContainer } from "react-toastify";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistory from "./pages/OrderHistory";
import OrdersList from "./pages/OrdersList";
import ProductsList from "./pages/ProductsList";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import { useAuth } from "./context/UseAuth";

function App() {
  const { isAdmin, isUser, user } = useAuth();
  const [serverProducts, setServerProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProducts();
  }, []);

  // Fetch products from the php backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost/php-backend/products.php",
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
        {/* PUBLIC + USER ROUTES */}
        {!isAdmin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin-signin" element={<AdminSignin />} />
            <Route path="/franchise" element={<Franchise />} />

            {/* AUTHENTICATED USER ROUTES */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart products={serverProducts} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout products={serverProducts} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </>
        )}

        {/* ADMIN ROUTES */}
        {isAdmin && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route path="/admin/products" element={<ProductsList />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
          </>
        )}

        {/* Catch-all */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
