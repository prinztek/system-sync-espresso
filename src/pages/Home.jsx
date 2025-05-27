import About from "../components/About";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Reviews from "../components/Reviews";
import products from "../data.json";
import { useEffect, useState } from "react";

function Home({
  handleAddToCart,
  submitEmail,
  newsLetterEmail,
  setNewsLetterEmail,
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("http://localhost/php-backend/index.php");
        const data = await res.json();
        console.log(data); // Log the full response
        setMessage(data.message); // Set the message from PHP
      } catch (err) {
        console.error("Error fetching from PHP:", err);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="main flex flex-col justify-center items-center">
      <Hero />
      <h1 className="text-blue-800">{message || "Loading..."}</h1>
      <About />
      <FeaturedProducts
        handleAddToCart={handleAddToCart}
        products={products.slice(0, 3)}
      />
      <Reviews />
      <Newsletter
        submitEmail={submitEmail}
        newsLetterEmail={newsLetterEmail}
        setNewsLetterEmail={setNewsLetterEmail}
      />
    </div>
  );
}

export default Home;
