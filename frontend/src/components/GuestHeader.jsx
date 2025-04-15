import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth"; // Make sure this path is correct
import TrashLabLogo from "../assets/images/trashlab.png";
import ArrowDown from "../assets/svg/arrow-down.svg";

const GuestHeader = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // If on homepage, scroll directly
      scrollToSection(sectionId);
    } else {
      // If on different page, navigate with state
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showGuide && !event.target.closest(".guide-dropdown")) {
        setShowGuide(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showGuide]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[130px] bg-white flex items-center justify-between px-[45px] shadow-sm">
      {/* Left side - Logo */}
      <div>
        <a href="/">
          {" "}
          <img src={TrashLabLogo} alt="TrashLab Logo" className="h-[40px]" />
        </a>
      </div>

      {/* Right side - Navigation */}
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-8 mr-8">
          <a
            href="/"
            className="text-[16px] font-medium hover:text-primary transition-colors"
          >
            Beranda
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavigation(e, "about")}
            className="text-[16px] font-medium hover:text-primary transition-colors"
          >
            Tentang
          </a>
          <div className="relative guide-dropdown">
            <button
              className="flex items-center gap-2 text-[16px] font-medium hover:text-primary transition-colors"
              onClick={() => setShowGuide(!showGuide)}
            >
              Panduan
              <img
                src={ArrowDown}
                alt="Dropdown"
                className={`w-4 h-4 transition-transform duration-200 ${
                  showGuide ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showGuide && (
              <div className="absolute top-full mt-2 bg-white rounded-md shadow-md py-2 w-[364px]">
                <a
                  href="/guide/organic"
                  className="block px-4 py-5 text-[16px] font-medium hover:text-primary"
                >
                  Sampah Organik
                </a>
                <div className="border-b border-[#E8E8E8]"></div>

                <a
                  href="/guide/inorganic"
                  className="block px-4 py-5 text-[16px] font-medium hover:text-primary"
                >
                  Sampah Anorganik
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!isAuth ? (
            <>
              <a
                href="/login"
                className="w-[140px] h-[40px] flex items-center justify-center text-[16px] bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="w-[140px] h-[40px] flex items-center justify-center text-[16px] border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Sign Up
              </a>
            </>
          ) : (
            <a
              href="/dashboard"
              className="w-[140px] h-[40px] flex items-center justify-center text-[16px] bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default GuestHeader;
