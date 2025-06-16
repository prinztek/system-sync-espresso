import About from "../components/About";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Reviews from "../components/Reviews";
import { useCart } from "../context/useCart";
import { useState, useEffect } from "react";
import { useAuth } from "../context/UseAuth";

function Home() {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverProducts, setServerProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProducts();
    // console.log(serverProducts);
  }, []);

  // Fetch products from the php backend
  const fetchProducts = async () => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <div className="main flex flex-col justify-center items-center">
      {user === null ? <Hero /> : null}
      <About />

      {isLoading && <p>Loading...</p>}

      {!isLoading && serverProducts.length !== 0 && (
        <FeaturedProducts
          handleAddToCart={addItem}
          products={serverProducts.slice(0, 3)}
        />
      )}

      <Reviews />
      <Newsletter />
    </div>
  );
}

export default Home;
