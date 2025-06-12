import { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const notify = (text, type) => {
    toast[type](text);
  };
  // for newsletter subscription
  const [newsLetterEmail, setNewsLetterEmail] = useState("");

  const submitNewsletterEmail = () => {
    if (!newsLetterEmail.trim()) {
      notify("Please enter a valid email address.", "error");
      return;
    }

    notify(
      "Thank you for subscribing to our newsletter! Stay tuned for updates.",
      "success"
    );
    setNewsLetterEmail(""); // Clear input field after successful submission
  };

  return (
    <div
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('src/assets/newsletter_images/crew-aw6UewokOIo-unsplash.jpg')",
      }}
    >
      <div className="max-w-[1240px]   mx-auto my-auto flex flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0 py-16 px-4  drop-shadow-lg">
        {/* Text Section */}
        <div className="text-center md:text-left text-white">
          <h2 className="text-3xl font-black">Sip & Save - Up to 30% Off!</h2>
          <p className="text-lg font-bold">
            Discover our specials, stories, and exclusive offers!
          </p>
        </div>

        {/* Input and Button Section */}
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={newsLetterEmail}
            onChange={(e) => setNewsLetterEmail(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-900"
          />
          <button
            onClick={submitNewsletterEmail}
            className="w-full md:w-auto px-6 py-2 bg-brown-600 text-white  font-semibold rounded-md hover:bg-brown-700 bg-orange-500 hover:bg-orange-600 ease-in-out"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
