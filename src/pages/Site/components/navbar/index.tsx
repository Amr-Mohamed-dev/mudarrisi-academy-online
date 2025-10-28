import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { themeStore } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";

const Navbar = () => {
  const links = [
    { href: PATHS.site.home.href, label: "الرئيسية" },
    { href: PATHS.site.teachers.href, label: "المدرسين" },
    { href: PATHS.site.subjects.href, label: "المواد" },
    { href: PATHS.site.about.href, label: "من نحن" },
  ];

  const navigate = useNavigate();
  const { theme, setTheme } = themeStore();
  const [activeLink, setActiveLink] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginButton = () => {
    navigate(PATHS.auth.auth.href);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [window.location.pathname]);

  const isActiveLink = (link: string) => activeLink === link;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary-200">المدرسين الجامدين</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`capitalize hover:opacity-80 transition-all duration-300 ease-in-out relative ${
                isActiveLink(link.href)
                  ? "text-primary-200"
                  : "dark:text-secondary-200"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-0.5 overflow-hidden">
                <span
                  className="block w-full h-full"
                  style={{
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent 0%, #017EA1 50%, #017EA1 50%, transparent 100%)",
                    opacity: isActiveLink(link.href) ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    transform: "scaleY(0.75)",
                  }}
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Controls (Theme + Login + Mobile Button) */}
        <div className="flex items-center gap-5">
          {/* Theme Switch */}
          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300 flex items-center"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                theme === "dark" ? "translate-x-6" : ""
              }`}
            />
            {theme === "dark" ? (
              <Moon className="absolute right-1 w-4 h-4 text-yellow-400" />
            ) : (
              <Sun className="absolute left-1 w-4 h-4 text-orange-400" />
            )}
          </button>

          {/* Login */}
          <button
            type="button"
            onClick={handleLoginButton}
            className="hidden md:block text-gray-600 dark:text-secondary-200 hover:opacity-80 rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
          >
            Login
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 dark:text-secondary-200 hover:opacity-80 transition-all"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`capitalize text-lg transition-all duration-200 ${
                isActiveLink(link.href)
                  ? "text-primary-200 font-semibold"
                  : "text-gray-700 dark:text-secondary-200"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => {
              handleLoginButton();
              setIsMenuOpen(false);
            }}
            className="text-gray-700 dark:text-secondary-200 hover:opacity-80 transition-all duration-300"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
