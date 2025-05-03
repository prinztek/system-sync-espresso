import heroImage from "../assets/hero-image.png";
import accentImage from "../assets/accent_images/beans.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mt-[90px] max-w-[1240px] grid md:grid-cols-2 grid-cols-1 place-items-center hero-section py-16 px-4">
        {/* Hero (Text) Left Section */}
        <div className="w-full h-full flex flex-col justify-center items-center text-center md:text-left md:px-4">
          <div className="w-full mb-6">
            <h1 className="font-bold text-xl md:text-6xl mt-8">
              SAVOR THE TASTE OF THE HOLIDAYS
            </h1>
            <h2 className="font-medium text-sm md:text-xl text-gray-700">
              Gather around with loved ones and share the warmth of our holiday
              coffee creations.
            </h2>
          </div>
          {/* Buttons Container */}
          <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="px-6 py-3 bg-none text-black text-sm transition active:scale-95  shadow-lg shadow-neutral-500/20 border border-black hover:bg-amber-600 hover:text-white"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => {
                navigate("/menu");
              }}
              className="px-6 py-3 bg-amber-600 text-sm transition active:scale-95 text-neutral-50 shadow-lg shadow-neutral-500/20 border hover:bg-amber-700 "
            >
              Explore Menu
            </button>
          </div>
        </div>
        {/* Hero Image Section */}
        <div>
          <div className="relative w-full h-full flex justify-center items-center ">
            {/* Accent Image Positioned Right Next to Hero Image */}
            <img
              src={accentImage}
              alt="accent-beans"
              className="absolute top-[200px] left-96 z-[1] w-4/5 origin-bottom-left rotate-[-25deg] hidden lg:block"
            />
            <img
              src={heroImage}
              alt="hero-image"
              className="md:w-3/5 w-[220px] z-[2] h-auto object-cover hover:rotate-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
