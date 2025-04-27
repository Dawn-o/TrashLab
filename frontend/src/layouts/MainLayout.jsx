import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Notification from "../components/Notification.jsx";
import Footer from "../components/Footer.jsx";
import axios from "../api/AxiosInstance.jsx";

const MainLayout = ({ children, notifSlug }) => {
  const pageTab = ["/dashboard", "/exchange", "/dashboard/pindai", "/history", "/profile"];
  const activeTab = pageTab.indexOf(window.location.pathname);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state isLoading

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
        setIsLoading(true); // Set loading state to true
        const response = await axios.get("/profile");
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const points = profile?.points ?? 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} points={points} isLoading={isLoading} />
      <main className="flex-grow pt-[70px]">{children}</main>
      <Notification notif={notifSlug} />
      <Footer />
    </div>
  );
};

export default MainLayout;
