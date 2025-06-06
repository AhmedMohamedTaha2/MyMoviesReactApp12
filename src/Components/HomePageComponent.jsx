import React, { useEffect, useRef, useState, useCallback } from "react";
// import SearchComponent from "./SearchComponent"; // Uncomment if you use it
// import ShiningButton from "./ShiningButton";     // Uncomment if you use it
import GradientText from "./GradientText"; // Make sure the path is correct

const App = () => {
  const movieTitles = [
    "Avengers: Endgame",
    "Frozen II",
    "Spider-Man: No Way Home",
    "Moana",
    "Black Panther",
    "Zootopia",
    "Guardians of the Galaxy",
    "The Lion King",
    "Iron Man",
    "Toy Story",
    "Captain America: Civil War",
    "Finding Nemo",
    "Thor: Ragnarok",
    "Coco",
    "Doctor Strange",
    "Up",
    "Ant-Man and the Wasp",
    "Inside Out",
    "Avengers: Infinity War",
    "Tangled",
    "Guardians of the Galaxy Vol. 2",
    "Big Hero 6",
    "Captain Marvel",
    "Wreck-It Ralph",
    "Shang-Chi and the Legend of the Ten Rings",
    "Encanto",
    "Eternals",
    "Raya and the Last Dragon",
  ];

  return (
    <div className="font-inter">
      <HomepageComponent movieTitles={movieTitles} gradientColor="black" />
    </div>
  );
};

const HomepageComponent = ({ movieTitles = [], gradientColor = "black" }) => {
  const rowRefs = useRef([]);
  const mouseXRef = useRef(window.innerWidth / 2);
  const animationFrameId = useRef(null);
  const [fetchedItems, setFetchedItems] = useState([]);

  // IMPORTANT: Replace with your actual OMDb API Key
  const OMDB_API_KEY = "f5e82cc2"; // Replace with your actual key

  const totalItems = 28;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );

  useEffect(() => {
    const fetchMoviePosters = async () => {
      if (!OMDB_API_KEY) {
        console.warn("OMDb API Key is missing. Using default placeholders.");
        setFetchedItems(defaultItems);
        return;
      }

      const posterPromises = movieTitles
        .slice(0, totalItems)
        .map(async (title) => {
          try {
            const response = await fetch(
              `https://www.omdbapi.com/?t=${encodeURIComponent(
                title
              )}&apikey=${OMDB_API_KEY}`
            );
            const data = await response.json();

            if (
              data.Response === "True" &&
              data.Poster &&
              data.Poster !== "N/A"
            ) {
              return data.Poster;
            } else {
              return `https://placehold.co/600x400/333/FFF?text=${encodeURIComponent(
                title.replace(/\s/g, "+")
              )}+Not+Found`;
            }
          } catch (error) {
            console.error(`Error fetching poster for ${title}:`, error);
            return `https://placehold.co/600x400/333/FFF?text=Error`;
          }
        });

      const posters = await Promise.all(posterPromises);
      setFetchedItems(posters);
    };

    fetchMoviePosters();
  }, [movieTitles, OMDB_API_KEY]);

  const combinedItems = fetchedItems.length > 0 ? fetchedItems : defaultItems;

  const handleMouseMove = useCallback((e) => {
    mouseXRef.current = e.clientX;
  }, []);

  const updateMotion = useCallback(() => {
    const maxMoveAmount = 300;
    const baseDuration = 0.8;
    const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

    rowRefs.current.forEach((row, index) => {
      if (row) {
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
            maxMoveAmount / 2) *
          direction;

        row.style.transition = `transform ${
          baseDuration + inertiaFactors[index % inertiaFactors.length]
        }s ease-out`;
        row.style.transform = `translateX(${moveAmount}px)`;
      }
    });

    animationFrameId.current = requestAnimationFrame(updateMotion);
  }, []);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(updateMotion);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleMouseMove, updateMotion]);

  return (
    <div className="h-full w-full overflow-hidden">
      <section
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 z-30">
          {/* Dark overlay background */}
          <div className="absolute inset-0 bg-black opacity-80"></div>

          {/* Content container - now separate from the overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4">
            <GradientText
              className="text-center mb-4" // Keep general positioning/margin here
              textClassName="text-4xl md:text-6xl lg:text-7xl xl:text-8xl" // Control font size here responsively
              colors={["#fff", "#00a6f4", "#00a6f4"]}
              animationSpeed={8}
            >
              Welcome to Movie Search App!
            </GradientText>
            <p className="text-lg md:text-xl text-center max-w-2xl">
              Discover a world of Movies, series, animes, and cartoons. Explore
              popular titles and immerse yourself in cinematic wonders.
            </p>
          </div>
        </div>

        <div className="gridMotion-container gap-4 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 transform -rotate-[15deg] origin-center z-20">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="row grid gap-4 grid-cols-7 will-change-[transform,filter]"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="row__item relative">
                    <div className="row__item-inner relative w-full h-full overflow-hidden rounded-lg bg-gray-900 flex items-center justify-center text-white text-2xl">
                      {typeof content === "string" &&
                      content.startsWith("http") ? (
                        <div
                          className="row__item-img w-full h-full bg-cover bg-center absolute top-0 left-0"
                          style={{
                            backgroundImage: `url(${content})`,
                          }}
                          onError={(e) => {
                            e.target.style.backgroundImage = `url(https://placehold.co/600x400/333/FFF?text=Image+Error)`;
                          }}
                        ></div>
                      ) : (
                        <div className="row__item-content p-4 text-center z-10">
                          {content}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default App;
