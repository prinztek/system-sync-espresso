function AboutContent({ index, about }) {
  const contentLayout = (index, about) => {
    if (index % 2 == 1) {
      return (
        <div className="flex items-center p-6 border-b-2">
          <div className="w-1/2 pr-6">
            <img
              src={about.imageUrl}
              alt="about image"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-600 mb-4">
              {about.title}
            </h3>
            <p className="text-sm sm:text-basetext-black leading-relaxed mb-4">
              {about.description}
            </p>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              {about.description2}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center p-6 border-b-2">
          <div className="w-1/2 pr-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-600 mb-4">
              {about.title}
            </h3>
            <p className="text-sm sm:text-basetext-black leading-relaxed mb-4">
              {about.description}
            </p>
            <p className="text-sm sm:text-base text-black leading-relaxed">
              {about.description2}
            </p>
          </div>
          <div className="w-1/2">
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
