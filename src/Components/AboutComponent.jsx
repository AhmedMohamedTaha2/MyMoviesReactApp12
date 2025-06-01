import React from "react";
import { motion } from "framer-motion";
import CountUp from "../Components/CountUpComponent";

const AboutComponent = () => {
  const features = [
    {
      title: "Advanced Search",
      description:
        "Find movies using filters for genre, year, rating, and more",
    },
    {
      title: "Movie Details",
      description:
        "Get comprehensive information about each movie including cast, ratings, and reviews",
    },
    {
      title: "Watchlist",
      description: "Save movies to your personal watchlist for later viewing",
    },
    {
      title: "Recommendations",
      description:
        "Discover new movies based on your viewing history and preferences",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen text-center bg-black flex flex-col lg:flex-row items-center justify-around p-4 gap-8 relative"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl rounded-lg p-6 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 w-full lg:w-1/3 text-center"
      >
        <motion.h2
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl font-bold text-sky-900 dark:text-sky-100 mb-6 text-center"
        >
          About This App
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 text-center"
        >
          <div className="prose dark:prose-invert text-center mx-auto">
            <p className="text-gray-800 dark:text-neutral-200 text-center">
              The React Movies App is designed to provide users with an
              intuitive interface for browsing and searching movies. Built with
              React, Vite, and Tailwind CSS, this application showcases the
              power of modern web development tools.
            </p>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-200 mb-4 text-center">
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900/30 text-center"
                >
                  <h4 className="font-medium text-sky-700 dark:text-sky-300 mb-2 text-center">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-sky-200 dark:border-sky-800 pt-6 text-center">
            <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-200 mb-4 text-center">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {["React", "Vite", "Tailwind CSS", "Framer Motion"].map(
                (tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 text-sm"
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-800 dark:text-neutral-200 mt-6 text-center italic"
          >
            Thank you for using our app!
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-sky-900 to-sky-800 shadow-xl rounded-lg p-8 w-full lg:w-1/3 text-center space-y-8"
      >
        <div className="stats-container">
          <h3 className="text-2xl font-bold text-white mb-2">
            Join Our Community
          </h3>
          <div className="flex items-center justify-center space-x-1">
            <CountUp
              from={0}
              to={3000}
              separator=","
              duration={2.5}
              className="text-4xl font-bold text-sky-400"
            />
            <span className="text-4xl font-bold text-sky-400">+</span>
          </div>
          <p className="text-sky-200 text-lg">Active Users</p>
        </div>

        <div className="stats-container mt-6">
          <h3 className="text-2xl font-bold text-white mb-2">Movie Library</h3>
          <div className="flex items-center justify-center space-x-1">
            <CountUp
              from={0}
              to={100000}
              separator=","
              duration={2.5}
              className="text-4xl font-bold text-sky-400"
            />
            <span className="text-4xl font-bold text-sky-400">+</span>
          </div>
          <p className="text-sky-200 text-lg">Available Movies</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 outline-none focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-opacity-50 border-none" 
        >
          Join Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AboutComponent;
