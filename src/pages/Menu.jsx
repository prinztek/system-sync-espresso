import products from "../data.json";
import ProductCard from "../components/ProductCard";

function Menu({ handleAddToCart }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1240px] mt-[90px] mx-auto my-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
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
