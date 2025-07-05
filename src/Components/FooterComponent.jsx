import { motion } from "framer-motion";
import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const FooterComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/AhmedAboelsnoonII?locale=ar_AR",
      icon: <FaFacebook className="h-6 w-6" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/AhmedMohamedTaha2",
      icon: <FaGithub className="h-6 w-6" />,
    },
    {
      name: "Twitter",
      href: "https://x.com/tech_geek12",
      icon: <FaTwitter className="h-6 w-6" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ahmed-mohamed-taha-5a4b49222/",
      icon: <FaLinkedin className="h-6 w-6" />,
    },
    {
      name: "Email",
      href: "mailto:ahmedaboelsnoon.12@gmail.com",
      icon: <HiMail className="h-6 w-6" />,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/201155115099",
      icon: <FaWhatsapp className="h-6 w-6" />,
    },
  ];

  return (
    <motion.footer
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white m-0  border-t-2 border-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div className="flex justify-center" variants={itemVariants}>
          <img
            src="../../public/Search.png"
            alt="Logo"
            className=" w-32 filter brightness-0 invert"
          />
        </motion.div>

        <motion.p
          className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-300"
          variants={itemVariants}
        >
          Connect with me! I'm Ahmed Mohamed Taha, a passionate tech enthusiast.
          Feel free to reach out through any of the platforms below.
        </motion.p>

        <motion.ul
          className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12"
          variants={containerVariants}
        >
          {["About", "Careers", "History", "Services", "Projects", "Blog"].map(
            (item) => (
              <motion.li
                key={item}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  className="text-gray-300 transition hover:text-sky-100"
                  href="#"
                >
                  {item}
                </a>
              </motion.li>
            )
          )}
        </motion.ul>

        <motion.ul
          className="mt-12 flex justify-center gap-6 md:gap-8"
          variants={containerVariants}
        >
          {socialLinks.map((social) => (
            <motion.li
              key={social.name}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={social.href}
                rel="noreferrer"
                target="_blank"
                className="text-gray-300 transition hover:text-sky-100"
              >
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-12 border-t-2 border-gray-100 pt-8"
          variants={itemVariants}
        >
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Ahmed Mohamed Taha. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default FooterComponent;
