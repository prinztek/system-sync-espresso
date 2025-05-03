import { useNavigate } from "react-router-dom";
import CoffeeFeatures from "./CoffeeFeatures";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full  py-16 px-4 bg-gray-100">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-6 md:p-12 h-full">
        {/* Image Section */}
        <div className="flex items-center justify-center h-full">
          <img
            className="w-full h-full object-cover rounded-lg shadow-lg rounded-tl-[50px]  md:rounded-tl-[100px]"
            src="src/assets/images/roman-bozhko-OXXsAafHDeo-unsplash.jpg"
            alt="Coffee shop"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center h-full bg-amber-600 rounded-lg rounded-br-[50px] md:rounded-br-[100px] shadow-lg p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to System Sync Espresso, where every cup tells a story.
          </h1>
          <p className="text-white leading-relaxed mb-6 text-sm sm:text-base md:text-lg">
            We believe that coffee is more than just a drink - it's an
            experience. Nestled in the heart of your town, our cozy shop offers
            a warm, welcoming atmosphere for everyone to enjoy. Whether you're
            here to catch up with friends, dive into a good book, or simply
            enjoy a quiet moment, we've crafted the perfect space for you to
            relax and recharge.
          </p>
          <button
            onClick={() => {
              navigate("/about");
            }}
            className="self-start md:self-center bg-white text-xs sm:text-sm border border-black text-black font-medium px-6 py-3 hover:bg-amber-600 hover:text-white transition duration-300 active:scale-95"
          >
            Learn More...
          </button>
        </div>
      </div>

      <CoffeeFeatures />
    </div>
  );
};

export default About;
