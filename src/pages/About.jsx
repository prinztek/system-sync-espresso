import AboutContent from "../components/AboutContent";

function About() {
  const aboutContent = [
    {
      imageUrl: "src/assets/about_images/about_image_1.png",
      title: "The Early Days 2021",
      description:
        "The first System Sync Espresso opened its doors in a modest, tech-inspired space in [City]. The shop was designed to stand out, with a unique blend of industrial design, high-speed Wi-Fi, and a carefully curated coffee menu. Drinks like the “Java Jolt” and “Espresso.exe” quickly gained a loyal following, attracting tech workers, students, and coffee aficionados.",
    },
    {
      imageUrl: "src/assets/about_images/about_image_2.png",
      title: "Rapid Growth & Innovation 2022",
      description:
        "As the shop grew in popularity, so did its ambitions. By [Year], System Sync Espresso introduced its first proprietary app, allowing customers to, earn rewards, and order ahead. The app’s sleek design mirrored the brand’s ethos—effortless and efficient.",
    },
    {
      imageUrl: "src/assets/about_images/about_image_3.png",
      title: "Becoming a Community Icon 2023",
      description:
        "By [Year], System Sync Espresso had expanded to multiple locations, each maintaining the same high standards of quality and atmosphere. Beyond its coffee, the brand became synonymous with community, hosting events like coding workshops, open mic nights, and “Hack & Sip” hackathons.",
    },
    {
      imageUrl: "src/assets/about_images/about_image_4.jpg",
      title: "A Legacy of Connection 2024",
      description:
        "Today, System Sync Espresso is a thriving name in the coffee world, with locations that span cities and neighborhoods. It continues to innovate, offering cutting-edge technology alongside its signature coffee experience. Yet, at its core, the heart of System Sync Espresso remains the same—a place where people, ideas, and caffeine come together in perfect harmony.",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="max-w-[1240px] mt-[90px] mx-auto my-auto rounded-md py-16 px-4 text-black">
        <h1 className="text-center text-4xl font-bold mb-4">
          The Origin Story of System Sync Espresso
        </h1>
        <p className="text-center text-lg font-medium text-gray-700 mb-4">
          It all began with a simple but powerful idea: to create a coffee shop
          where precision, technology, and community converged over a great cup
          of coffee. The story of System Sync Espresso started in 2016, when its
          founder—a tech enthusiast with a love for artisan coffee—dreamed of
          creating a place where the hustle of modern life could sync with
          moments of pause and connection.
        </p>
        {aboutContent.map((about, index) => (
          <AboutContent about={about} index={index} />
        ))}
      </div>
    </div>
  );
}

export default About;
