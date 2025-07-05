// components/NavbarComponent.jsx
import React, { useState, useEffect, useRef } from "react";
// Using a mock Link for standalone demonstration
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);
import { motion, AnimatePresence } from "framer-motion";

// --- Helper Icon Components ---
const AnimatedHamburgerIcon = ({ isOpen, ...props }) => {
  const topVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 8 },
  };
  const middleVariants = { closed: { opacity: 1 }, open: { opacity: 0 } };
  const bottomVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -8 },
  };
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <motion.path
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={topVariants}
        animate={isOpen ? "open" : "closed"}
      />
      <motion.path
        d="M3 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={middleVariants}
        animate={isOpen ? "open" : "closed"}
      />
      <motion.path
        d="M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={bottomVariants}
        animate={isOpen ? "open" : "closed"}
      />
    </motion.svg>
  );
};
const SearchIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const ArrowLeftIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);
// --- NEW ICONS FOR MENU ---
const HomeIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const FilmIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);

// --- Main Navbar Component ---
const NavbarComponent = ({ setSearchTerm, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Prevent body scroll when the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Scroll Hide/Show Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100 || isMenuOpen || isSearchVisible)
        setIsHidden(false);
      else if (currentScrollY > lastScrollY.current) setIsHidden(true);
      else if (currentScrollY < lastScrollY.current) setIsHidden(false);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, isSearchVisible]);

  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon className="w-7 h-7" /> },
    {
      to: "/watched",
      label: "Watched Movies",
      icon: <FilmIcon className="w-7 h-7" />,
    },
  ];

  const handleLinkClick = () => {
    if (setSearchTerm) setSearchTerm("");
    setIsMenuOpen(false);
  };

  // --- Animation Variants ---
  const navbarVariants = {
    visible: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
    hidden: { y: "-100%", transition: { duration: 0.35, ease: "easeInOut" } },
  };

  const mobileMenuVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const mobileViewVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  // --- NEW VARIANTS FOR STAGGERED MENU ---
  const mobileLinkContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1, // Delay each child animation by 0.1s
        delayChildren: 0.2, // Wait 0.2s after the menu appears to start animating links
      },
    },
  };

  const mobileLinkVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // A nice cubic-bezier curve
      },
    },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10"
        variants={navbarVariants}
        animate={isHidden ? "hidden" : "visible"}
      >
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-18">
          {/* ... (Mobile and Desktop Views are the same as before) ... */}
          {/* --- MOBILE VIEW --- */}
          <div className="md:hidden flex items-center justify-between w-full">
            <AnimatePresence mode="wait">
              {isSearchVisible ? (
                <motion.div
                  key="search-view"
                  className="flex items-center w-full gap-4 my-3"
                  variants={mobileViewVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSearchVisible(false)}
                  >
                    <ArrowLeftIcon className="text-slate-300" />
                  </motion.button>
                  <div className="w-full">{children}</div>
                </motion.div>
              ) : (
                <motion.div
                  key="default-view"
                  className="flex items-center justify-between w-full"
                  variants={mobileViewVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Link to="/" onClick={handleLinkClick}>
                    <img
                      src="/Search.png"
                      alt="MyMovies Logo"
                      className="w-20 md:w-24 h-auto"
                    />
                  </Link>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSearchVisible(true)}
                      className="p-2 text-slate-300"
                    >
                      <SearchIcon />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 text-slate-300 z-50"
                    >
                      <AnimatedHamburgerIcon isOpen={isMenuOpen} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- DESKTOP VIEW --- */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <Link to="/" onClick={handleLinkClick}>
                <img
                  src="/Search.png"
                  alt="MyMovies Logo"
                  className="w-24 h-auto"
                />
              </Link>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 lg:px-4 rounded-md font-medium transition-colors duration-200 text-[clamp(0.875rem,1.5vw,1rem)]"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center">{children}</div>
          </div>
        </nav>
      </motion.header>

      {/* --- Immersive Mobile Menu (UPDATED) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.nav
              className="flex flex-col items-center gap-10"
              variants={mobileLinkContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  variants={mobileLinkVariants}
                  className="w-full"
                >
                  <Link
                    to={link.to}
                    className="group flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    <div className="p-4 bg-slate-800/50 group-hover:bg-sky-500/20 rounded-full transition-all duration-300 group-hover:scale-110">
                      {link.icon}
                    </div>
                    <span className="text-lg font-medium tracking-wider group-hover:text-sky-300 transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarComponent;
