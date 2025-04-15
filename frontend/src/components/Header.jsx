import React, { useEffect, useState } from "react";
import HomeIcon from "../assets/svg/home.svg";
import HomeIconActive from "../assets/svg/home-white.svg";
import ExchangeIcon from "../assets/svg/card-exchange.svg";
import ExchangeIconActive from "../assets/svg/card-exchange-white.svg";
import ScanIcon from "../assets/svg/scan.svg";
import ScanIconActive from "../assets/svg/scan-white.svg";
import HistoryIcon from "../assets/svg/history.svg";
import HistoryIconActive from "../assets/svg/history-white.svg";
import { getUserProfile, logoutUser } from "../services/apiServices";
import HamburgerIcon from "../assets/svg/hamburger.svg";
import TrashLabLogo from "../assets/images/trashlab-2.png";
import LogoutIcon from "../assets/svg/logout.svg";
import Loading from "../components/Loading.jsx";

const Header = ({ activeTab, isLoading }) => {

  const navItems = ["Beranda", "Penukaran", "Pindai Sampah", "Riwayat Pindai"];
  const paths = ["/dashboard", "/exchange", "/scan", "/history"];
  const icons = [HomeIcon, ExchangeIcon, ScanIcon, HistoryIcon];
  const activeIcons = [
    HomeIconActive,
    ExchangeIconActive,
    ScanIconActive,
    HistoryIconActive,
  ];

  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.profile);
        setPoints(res.profile.points);
      } catch (error) {
        console.error("Gagal ambil profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleDirectLogin = () => {
    if (!user) {
      window.location.href = "/login";
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.clear(); // bersih sekalian bro
      window.location.href = "/login?notif=success-sign-out";
    } catch (err) {
      console.error("Logout gagal:", err);
      window.location.href = "/dashboard?notif=failed-sign-out";
    }
  };

  const getInitials = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData.name) return "?";
    return userData.name.charAt(0).toUpperCase();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".avatar-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <>
      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="md:hidden" onClick={toggleSidebar} />}

      {/* Mobile Sidebar */}
      <div
        className={`
                md:hidden fixed top-0 left-0 h-full w-[194px] bg-white z-50 border-r border-gray-200
                transform transition-transform duration-300 flex flex-col
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        {/* Logo Section */}
        <div className="px-6 pt-16 pb-6 flex justify-center">
          <img src={TrashLabLogo} alt="TrashLab" className="h-[100px]" />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={paths[index]}
              className={`flex items-center px-6 py-4 gap-3 hover:bg-gray-50
                                ${activeTab === index
                  ? "text-white bg-primary rounded-md mx-2"
                  : "text-black"
                }
                            `}
            >
              <img
                src={activeTab === index ? activeIcons[index] : icons[index]}
                alt={item}
                className="w-5 h-5"
              />
              <span>{item}</span>
            </a>
          ))}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-4 gap-3 text-white bg-[#C81313] rounded-md mx-2 mb-4"
        >
          <img src={LogoutIcon} alt="Logout" />
          Sign out
        </button>
      </div>

      {/* Main Header */}
      <header className="flex fixed top-0 left-0 right-0 z-30 justify-center p-3 max-md:py-2 bg-white text-[#1e1e1e] outline-1 outline-[#E8F0EB]">
        <div className="flex justify-between items-center max-w-7xl w-full px-2">
          {/* Hamburger Menu - Mobile Only */}
          <button className="md:hidden p-2" onClick={toggleSidebar}>
            <img src={HamburgerIcon} alt="Menu" className="w-6 h-6" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 items-center">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`font-medium text-[18px] px-2 py-4 rounded-[8px] ${activeTab === index ? "text-white bg-primary" : "text-black"
                    }`}
                >
                  <a
                    className="flex flex-row gap-2 justify-start items-center"
                    href={paths[index]}
                  >
                    <img
                      src={
                        activeTab === index ? activeIcons[index] : icons[index]
                      }
                      alt={`${item} icon`}
                    />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Points and Avatar Section */}
          <div className="flex gap-12 max-md:gap-8 max-sm:gap-4 items-center">
            <div
              onClick={handleDirectLogin}
              className={`font-medium max-md:text-[9px] flex justify-center items-center ${!user ? "cursor-pointer" : ""
                } max-md:gap-1 gap-2 outline-2 max-md:outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2`}
            >
              {!isLoading ? (<>
                <svg
                  className="md:h-[30px] md:w-[30px]"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5 1.75C10.9519 1.75 13.75 4.54813 13.75 8C13.75 11.4519 10.9519 14.25 7.5 14.25C4.04813 14.25 1.25 11.4519 1.25 8C1.25 4.54813 4.04813 1.75 7.5 1.75ZM7.5 3C6.17392 3 4.90215 3.52678 3.96447 4.46447C3.02678 5.40215 2.5 6.67392 2.5 8C2.5 9.32608 3.02678 10.5979 3.96447 11.5355C4.90215 12.4732 6.17392 13 7.5 13C8.82608 13 10.0979 12.4732 11.0355 11.5355C11.9732 10.5979 12.5 9.32608 12.5 8C12.5 6.67392 11.9732 5.40215 11.0355 4.46447C10.0979 3.52678 8.82608 3 7.5 3ZM6.61625 5.34812C6.83752 5.127 7.13367 4.99687 7.44621 4.98345C7.75875 4.97003 8.06496 5.07428 8.30437 5.27562L8.38375 5.34812L10.1519 7.11625C10.373 7.33752 10.5031 7.63367 10.5165 7.94621C10.53 8.25875 10.4257 8.56496 10.2244 8.80437L10.1519 8.88375L8.38375 10.6519C8.16248 10.873 7.86633 11.0031 7.55379 11.0165C7.24125 11.03 6.93504 10.9257 6.69563 10.7244L6.61625 10.6519L4.84812 8.88375C4.627 8.66248 4.49687 8.36633 4.48345 8.05379C4.47003 7.74125 4.57428 7.43504 4.77562 7.19563L4.84812 7.11625L6.61625 5.34812ZM7.5 6.2325L5.7325 8L7.5 9.7675L9.2675 8L7.5 6.2325Z"
                    fill="#68A36F"
                  />
                </svg>
                <p>
                  Anda memiliki{" "}
                  <span className="font-bold max-md:text-[11px] text-[20px]">
                    {points}
                  </span>{" "}
                  Poin
                </p></>
              ) : (
                <Loading />
              )}
            </div>
            <div className="relative avatar-dropdown">
              {/* Avatar Circle with Initial */}
              <div
                onClick={toggleDropdown}
                className="rounded-full w-[45px] h-[45px] cursor-pointer bg-secondary text-white flex items-center justify-center font-semibold text-xl"
              >
                {getInitials()}
              </div>

              {/* Dropdown menu */}
              <div
                className={`
                                flex flex-col w-[150px] text-[#1E1E1E] font-medium absolute top-16 right-0 shadow-lg z-10
                                transition-all duration-300 ease-out
                                ${isDropdownOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                  }
                            `}
              >
                {!user ? (
                  <button
                    onClick={handleDirectLogin}
                    className="rounded-[8px] cursor-pointer w-full text-center py-4 px-6 outline-1 outline-[#ECECEC] bg-white hover:bg-gray-100"
                  >
                    Sign in
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => (window.location.href = "/profile")}
                      className="rounded-t-[8px] w-full cursor-pointer text-center py-4 px-6 outline-1 outline-[#ECECEC] bg-white hover:bg-gray-100"
                    >
                      Profile saya
                    </button>
                    <button
                      onClick={handleLogout}
                      className="rounded-b-[8px] w-full cursor-pointer text-center py-4 px-6 outline-1 outline-[#ECECEC] bg-white hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
