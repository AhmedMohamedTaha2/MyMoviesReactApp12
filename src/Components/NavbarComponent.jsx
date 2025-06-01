// NavbarComponent.jsx
import React, { useState } from "react"; // من HEAD
import { Link } from "react-router-dom"; // من HEAD
import { motion } from "framer-motion"; // من HEAD

// تم اختيار نسخة HEAD التي تستقبل setSearchTerm
const NavbarComponent = ({ setSearchTerm, children }) => {
  const [isOpen, setIsOpen] = useState(false); // من HEAD

  const toggleMenu = () => { // من HEAD
    setIsOpen(!isOpen);
  };

  const menuVariants = { // من HEAD
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto", // Ensures content determines height
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    // تم اختيار تصميم الهيدر من HEAD
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-gradient-to-r from-gray-900 to-gray-800 border-b-2 border-gray-100">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          {/* تم اختيار اللوجو والرابط من HEAD */}
          <Link
            to="/"
            className="text-white text-xl font-bold hover:text-gray-300"
            onClick={() => {
              if (setSearchTerm) setSearchTerm(""); // التأكد من وجود الدالة قبل استدعائها
              if (isOpen) setIsOpen(false); // إغلاق القائمة عند الضغط على اللوجو
            }}
          >
            <img src="/Search.png" alt="Logo" className="w-24" /> {/* تأكد أن مسار الصورة صحيح */}
          </Link>
          <div className="sm:hidden">
            {/* تم اختيار زر التبديل الخاص بـ HEAD مع framer-motion */}
            <button
              type="button"
              className="relative size-9 flex justify-center items-center gap-x-2 rounded-lg"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              style={{ backgroundColor: "#FFF" }} // تم الاحتفاظ بها من HEAD
            >
              {!isOpen ? (
                <svg
                  className="shrink-0 size-4 text-sky-500 font-bold"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="shrink-0 size-4 text-red-600 font-bold"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* قسم الـ children للشاشات الكبيرة */}
        <div className="hidden sm:block sm:basis-full sm:grow">
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-5 sm:mt-0 sm:ps-5 justify-center md:justify-end">
            {children}
          </div>
        </div>

        {/* قسم الـ children المتحرك للشاشات الصغيرة باستخدام framer-motion */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="sm:hidden basis-full grow overflow-hidden" // Added overflow-hidden for smoother animation
        >
          <div className="flex flex-col items-center gap-5 mt-5 py-3"> {/* Added py-3 for padding */}
            {children}
          </div>
        </motion.div>
      </nav>
    </header>
  );
};

export default NavbarComponent;