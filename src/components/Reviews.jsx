import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      // console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  const reviews = [
    {
      name: "Alice Johnson",
      position: "Coffee Enthusiast",
      review:
        "The best coffee in town! The ambiance is perfect for work or a casual hangout. Highly recommend the caramel latte!",
      imageUrl: "src/assets/review_images/pexels-anna-nekrashevich-8993561.jpg",
      rating: 5,
      date: "10th Feb, 2023",
    },
    {
      name: "Michael Brown",
      position: "Frequent Visitor",
      review:
        "Great service and the pastries are amazing! My go-to spot for a quick coffee break.",
      imageUrl: "src/assets/review_images/pexels-cottonbro-5378700.jpg",
      rating: 4,
      date: "15th Mar, 2023",
    },
    {
      name: "Sophia Lee",
      position: "Food Blogger",
      review:
        "Absolutely love this place! The staff is super friendly, and their seasonal specials are a must-try.",
      imageUrl:
        "src/assets/review_images/pexels-dziana-hasanbekava-7275385.jpg",
      rating: 5,
      date: "22nd Apr, 2023",
    },
    {
      name: "Emily Carter",
      position: "Pastry Lover",
      review:
        "The pastries are fantastic, and the coffee is top-notch. Perfect spot to relax!",
      imageUrl: "src/assets/review_images/pexels-gabby-k-5384445.jpg",
      rating: 4,
      date: "5th May, 2023",
    },
    {
      name: "Jeff Chan",
      position: "Tea Enthusiast",
      review:
        "Absolutely love this place! The staff is super friendly, and their seasonal specials are a must-try.",
      imageUrl: "src/assets/review_images/pexels-laker-5792641.jpg",
      rating: 5,
      date: "10th Jun, 2023",
    },
  ];

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-[1240px] mx-auto my-auto p-6  rounded-md  py-16 px-4">
        <h2 className="text-2xl font-bold text-center text-black">
          What Our Customers Are Saying
        </h2>
        <h3 className="text-lg font-bold text-center mb-6 text-gray-500">
          "Delighting taste buds with coffee, treats, and sweet moments - hear
          it from those who love us!"
        </h3>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg embla__slide"
              >
                <div className="flex justify-between items-start mb-4">
                  {/* Star Ratings */}
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.388-2.455a1 1 0 00-1.176 0L5.538 17.973c-.785.57-1.84-.197-1.54-1.118l1.286-3.955a1 1 0 00-.364-1.118L1.532 8.382c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69L9.049 2.927z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                {/* Review Content */}
                <p className="text-gray-700 mb-4">{review.review}</p>
                <div className="flex items-center gap-3">
                  {/* Profile Image */}
                  <div className="w-12 h-12 overflow-hidden rounded-full border border-gray-300">
                    <img
                      src={review.imageUrl}
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">{review.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
