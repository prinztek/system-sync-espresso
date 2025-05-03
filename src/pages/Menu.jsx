import products from "../data.json";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

function Menu({ handleAddToCart }) {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <div className="min-h-screen mt-[90px] mx-auto py-16 px-4">
      <div className="max-w-[1240px] flex flex-col px-6">
        <h2 className="text-center text-black text-4xl font-bold mb-8">
          Full Menu
        </h2>
        <input
          id="searchField"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
          className="mt-2 p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
      </div>

      <div className="max-w-[1240px] mx-auto my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6  ">
        {products
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>
    </div>
  );
}

export default Menu;
