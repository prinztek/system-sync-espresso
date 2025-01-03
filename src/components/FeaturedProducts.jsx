import ProductCard from "./ProductCard";

function FeaturedProducts({ products, handleAddToCart }) {
  return (
    <div className="w-full text-white py-16 px-4">
      <h2 className="text-center text-black text-4xl font-bold mb-8">
        Try Our Best Sellers
      </h2>
      <div className="max-w-[1240px] mx-auto my-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
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

export default FeaturedProducts;
