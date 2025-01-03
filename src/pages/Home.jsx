import About from "../components/About";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Reviews from "../components/Reviews";
import products from "../data.json";

function Home({ handleAddToCart }) {
  return (
    <div className="main flex flex-col justify-center items-center">
      <Hero />
      <About />
      <FeaturedProducts
        handleAddToCart={handleAddToCart}
        products={products.slice(0, 3)}
      />
      <Reviews />
      <Newsletter />
    </div>
  );
}

export default Home;
