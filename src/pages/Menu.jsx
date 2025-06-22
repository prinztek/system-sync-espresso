import products from "../data.json";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useCart } from "../context/useCart";

function Menu() {
  const { addItem } = useCart();

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [serverProducts, setServerProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProducts();
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
      console.log(data);

      setServerProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-[90px] mx-auto py-16 px-4">
      <div className="max-w-[1240px] flex flex-col px-6">
        <h2 className="text-center text-black text-4xl font-bold mb-8">
          Full Menu
        </h2>
        {isLoading && <p>Loading...</p>}
        {!isLoading && serverProducts.length !== 0 && (
          <input
            id="searchField"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
            className="mt-2 p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        )}
      </div>
      {!isLoading && serverProducts.length !== 0 && (
        <div className="max-w-[1240px] mx-auto my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6  ">
          {serverProducts
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={addItem}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
