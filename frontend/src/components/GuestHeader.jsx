import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.js";
import TrashLabLogo from "../assets/images/trashlab.png";
import ArrowDown from "../assets/svg/arrow-down.svg";
import HamburgerIcon from "../assets/svg/hamburger.svg";

const GuestHeader = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileGuide, setShowMobileGuide] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showGuide && !event.target.closest(".guide-dropdown")) {
        setShowGuide(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showGuide]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowGuide(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[80px] md:h-[130px] bg-white flex items-center justify-between px-4 md:px-[45px] shadow-sm">
        {/* Left side - Logo */}
        <div>
          <a href="/">
            <img src={TrashLabLogo} alt="TrashLab Logo" className="h-[30px] md:h-[40px]" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-2"
          onClick={toggleMobileMenu}
        >
          <img 
            src={HamburgerIcon} 
            alt="Menu" 
            className={`w-6 h-6 transition-colors duration-200 ${isMobileMenuOpen ? 'text-primary' : 'text-black'}`}
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 mr-8">
            <a
              href="/"
              className="text-[16px] font-medium hover:text-primary transition-colors rounded-lg px-4 py-2"
            >
              Beranda
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavigation(e, "about")}
              className="text-[16px] font-medium hover:text-primary transition-colors rounded-lg px-4 py-2"
            >
              Tentang
            </a>
            <div className="relative guide-dropdown">
              <button
                className="flex items-center justify-between w-full text-[16px] font-medium hover:text-primary transition-colors rounded-lg px-4 py-2 min-w-[120px]"
                onClick={() => setShowGuide(!showGuide)}
              >
                <span>Panduan</span>
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
                <div className="absolute top-full mt-2 bg-white rounded-md shadow-md py-2 w-[264px]">
                  <a
                    href="/panduan?sampah=organik"
                    className="block px-4 py-5 text-[16px] font-medium hover:text-primary"
                  >
                    Sampah Organik
                  </a>
                  <div className="border-b border-[#E8E8E8]"></div>

                  <a
                    href="/panduan?sampah=anorganik"
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

      {/* Mobile Menu Below Header */}
      <div className={`
        fixed md:hidden top-[80px] left-0 right-0 z-40
        bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
      `}>
        <div className="px-6 flex flex-col divide-y divide-gray-200">
          <a
            href="/"
            className="text-[16px] font-medium py-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Beranda
          </a>
          <a
            href="#about"
            onClick={(e) => {
              handleNavigation(e, "about");
              setIsMobileMenuOpen(false);
            }}
            className="text-[16px] font-medium py-4"
          >
            Tentang
          </a>
          <div className="flex flex-col">
            <button
              className="text-left text-[16px] font-medium py-4 w-full flex items-center justify-between"
              onClick={() => setShowMobileGuide(!showMobileGuide)}
            >
              <span>Panduan</span>
              <img
                src={ArrowDown}
                alt="Dropdown"
                className={`w-4 h-4 transition-transform duration-200 ${
                  showMobileGuide ? "rotate-180" : ""
                }`}
              />
            </button>
            {showMobileGuide && (
              <div>
                <a
                  href="/panduan?sampah=organik"
                  className="block px-4 py-4 text-[16px]"
                  onClick={() => {
                    setShowMobileGuide(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sampah Organik
                </a>
                <a
                  href="/panduan?sampah=anorganik"
                  className="block px-4 py-4 text-[16px]"
                  onClick={() => {
                    setShowMobileGuide(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sampah Anorganik
                </a>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 py-4">
            {!isAuth ? (
              <>
                <a
                  href="/login"
                  className="w-full h-[40px] flex items-center justify-center text-[16px] bg-primary text-white rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="w-full h-[40px] flex items-center justify-center text-[16px] border-2 border-primary text-primary rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </>
            ) : (
              <a
                href="/dashboard"
                className="w-full h-[40px] flex items-center justify-center text-[16px] bg-primary text-white rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestHeader;
