import React from "react";

const CoffeeFeatures = () => {
  const features = [
    {
      icon: "🚚",
      title: "Nationwide Delivery",
      description: "Fresh coffee beans delivered straight to your doorstep.",
    },
    {
      icon: "⏰", // Replace with a coffee-related icon/image
      title: "24/7 Service",
      description: "Order your favorite coffee anytime, anywhere.",
    },
    {
      icon: "🎉", // Replace with a coffee-related icon/image
      title: "Exclusive Deals",
      description: "Enjoy special discounts on your favorite coffee blends.",
    },
    {
      icon: "💳", // Replace with a coffee-related icon/image
      title: "Easy Payments",
      description:
        "We accept most payment methods, including GCash, PayMaya, Paypal.",
    },
  ];

  return (
    <div className="container max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 md:p-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-none group"
        >
          {/* Icon with hover effect */}
          <div className="text-4xl sm:text-5xl mb-4 transform transition-transform duration-300 ease-in-out group-hover:scale-110">
            {feature.icon}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-black mb-2 transition-colors duration-300 ease-in-out group-hover:text-amber-600">
            {feature.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CoffeeFeatures;
