import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Notification from "../components/Notification.jsx";
import Footer from "../components/Footer.jsx";
import axios from "../api/AxiosInstance.jsx";

const MainLayout = ({ children, notifSlug }) => {
  const pageTab = ["/dashboard", "/exchange", "/scan", "/history"];
  const activeTab = pageTab.indexOf(window.location.pathname);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) setUser(userData);
    } catch (err) {
      console.error("User data corrupted 🫠:", err);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const points = profile?.points ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} avatar="/Avatar.png" points={points} />
      <main className="flex-grow pt-[70px]">
        {children}</main>
      <Notification notif={notifSlug} />
      <Footer />
    </div>
  );
};

export default MainLayout;
