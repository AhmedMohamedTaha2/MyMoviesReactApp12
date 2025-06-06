import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavbarComponent = ({ setSearchTerm, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/watched", label: "Watched Movies" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-b from-gray-900 to-gray-800 text-white m-0  border-b-2 border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left Section - Logo */}
          <div className="flex-none w-1/4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link
                to="/"
                className="flex items-center"
                onClick={() => {
                  if (setSearchTerm) setSearchTerm("");
                  if (isOpen) setIsOpen(false);
                }}
              >
                <img src="/Search.png" alt="Logo" className="w-20 h-auto" />
              </Link>
            </motion.div>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center items-center w-2/4">
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mx-4"
              >
                <Link
                  to={link.to}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  onClick={() => {
                    if (setSearchTerm) setSearchTerm("");
                    if (isOpen) setIsOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Section - Children Components */}
          <div className="hidden md:flex flex-none w-1/4 justify-end">
            {children}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden ml-auto inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => {
                      if (setSearchTerm) setSearchTerm("");
                      setIsOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4">{children}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default NavbarComponent;