function AboutContent({ index, about }) {
  const contentLayout = (index, about) => {
    if (index % 2 == 1) {
      return (
        <div className="flex flex-col sm:flex-row items-center p-6 border-b-2">
          <div className="w-full sm:w-1/2 sm:pr-6 mb-4 sm:mb-0">
            <img
              src={about.imageUrl}
              alt="about image"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-600 mb-4">
              {about.title}
            </h3>
            <p className="text-base sm:text-base text-black leading-relaxed mb-4">
              {about.description}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col sm:flex-row items-center p-6 border-b-2">
          <div className="w-full sm:w-1/2">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-600 mb-4">
              {about.title}
            </h3>
            <p className="text-basesm:text-basetext-black leading-relaxed mb-4">
              {about.description}
            </p>
          </div>
          <div className="w-full sm:w-1/2 sm:pr-6 mb-4 sm:mb-0">
            <img
              src={about.imageUrl}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      );
    }
  };
  return contentLayout(index, about);
}

export default AboutContent;
