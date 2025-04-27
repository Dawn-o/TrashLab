import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import GreenGuardianBadge from "../assets/svg/green-guardian-badge.svg";
import EcoWariorBadge from "../assets/svg/eco-warior-badge.svg";
import MasterRecyclerBadge from "../assets/svg/master-recycler-badge.svg";
import StastisticIcon from "../assets/svg/iconoir_organic-food.svg";
import Arrow from "../assets/svg/arrow-right.svg";
import axios from "../api/AxiosInstance";
import Loading from "../components/Loading";

const ProfilePage = () => {
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [badges, setBadges] = useState([]);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getInitials = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData.name) return "?";
    return userData.name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, badgesResponse] = await Promise.all([
          axios.get("/profile"),
          axios.get("/badges"),
        ]);

        setProfileData(profileResponse.data.profile);
        setBadges(badgesResponse.data.badges);
        setCurrentBadge(badgesResponse.data.current_badge);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBadgeSelect = async (badgeId) => {
    try {
      // No need to parse badgeId since it's already a number from the badge.id
      if (!badgeId) {
        setError("Invalid badge selected");
        return;
      }

      setLoading(true);
      setError(null);

      // Send the badge_id as formData
      const formData = new FormData();
      formData.append("badge_id", badgeId);

      await axios.post("/badges/set-active", formData);

      // Refetch badges to get updated state
      const response = await axios.get("/badges");
      setBadges(response.data.badges);
      setCurrentBadge(response.data.current_badge);
      setIsOpenSelection(false);
    } catch (err) {
      console.error("Badge update error:", err);
      setError(err.response?.data?.message || "Failed to update badge");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      </MainLayout>
    );
  if (error)
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen text-red-500">
          {error}
        </div>
      </MainLayout>
    );
  if (!profileData) return null;

  return (
    <MainLayout>
      <div className="h-[calc(100vh - 200px)] flex flex-col justify-start items-center max-md:gap-4 gap-8">
        <div className="w-full flex flex-col justify-end relative items-center bg-secondary h-[200px] max-md:h-[140px]">
          <div
            className="absolute top-[140px] max-md:top-[80px] rounded-full w-[100px] h-[100px] 
                        bg-white text-secondary flex items-center justify-center 
                        text-[40px] font-semibold border-4 border-white"
          >
            {getInitials()}
          </div>
        </div>
        <container className="flex max-w-7xl w-full flex-col items-start justify-center gap-10 max-md:py-2 px-6">
          <div className="relative w-full flex flex-col justify-start items-center py-6 gap-8">
            <div className="w-full flex flex-col justify-start items-center">
              <h3>{profileData.name}</h3>
              <p>{profileData.email}</p>
              <p className="text-[12px]">
                Rank <span className="text-primary">#{profileData.rank}</span>
              </p>
            </div>
            <div className="flex flex-col relative justify-between items-start w-full gap-4">
              <h3 className="max-md:text-[20px] text-[26px] font-semibold capitalize">
                Badge Aktif
              </h3>
              <button
                onClick={() => setIsOpenSelection((prev) => !prev)}
                className="flex w-full justify-between cursor-pointer items-center outline-1 outline-[#C9C9C9] rounded-[10px] bg-white hover:bg-grey-100 px-6 py-2"
              >
                <div className="flex justify-start items-center gap-4 max-md:gap-2">
                  {(currentBadge?.name ||
                    badges.find((b) => b.is_active)?.name) &&
                    (currentBadge?.url ||
                    badges.find((b) => b.is_active)?.image_url ? (
                      <img
                        src={`https://trashlab.rushel.my.id${
                          currentBadge?.url ||
                          badges.find((b) => b.is_active)?.image_url
                        }`}
                        className="w-[40px] h-[40px]"
                        alt="Current Badge"
                      />
                    ) : null)}
                  <div className="flex flex-col">
                    <h4>
                      {currentBadge?.name ||
                        badges.find((b) => b.is_active)?.name ||
                        "Select Badge"}
                    </h4>
                  </div>
                </div>
                <img
                  src={Arrow}
                  className={`w-[20px] h-[20px] transition-transform duration-200 ${
                    isOpenSelection ? "rotate-270" : "rotate-90"
                  }`}
                  alt="arrow"
                />
              </button>

              <div className="w-full relative h-0">
                {isOpenSelection && (
                  <div className="flex flex-col justify-start absolute items-center w-full outline-1 outline-[#C9C9C9] rounded-[10px] gap-0 bg-white shadow-lg">
                    {error && (
                      <div className="w-full px-6 py-2 text-sm text-red-500 text-center border-b border-gray-100">
                        {error}
                      </div>
                    )}
                    {/* Sort badges to show active one first */}
                    {[...badges]
                      .sort((a, b) => (b.is_active ? 1 : -1))
                      .map((badge) => (
                        <button
                          key={badge.id}
                          onClick={() =>
                            !badge.is_active && handleBadgeSelect(badge.id)
                          }
                          className={`flex w-full justify-between items-center px-6 py-2 first:rounded-t-[10px] last:rounded-b-[10px] ${
                            badge.is_active
                              ? "bg-gray-50 cursor-not-allowed"
                              : "hover:bg-gray-50 cursor-pointer"
                          }`}
                          disabled={badge.is_active}
                        >
                          <div className="flex justify-start items-center gap-4 max-md:gap-2">
                            <img
                              src={`https://trashlab.rushel.my.id${badge.image_url}`}
                              className="w-[40px] h-[40px]"
                              alt={badge.name}
                            />
                            <div className="flex flex-col items-start">
                              <h4
                                className={`font-medium ${
                                  badge.is_active ? "text-gray-500" : ""
                                }`}
                              >
                                {badge.name}
                                {badge.is_active && (
                                  <span className="ml-2 text-primary">
                                    (Active)
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Acquired:{" "}
                                {new Date(
                                  badge.acquired_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between items-start w-full gap-4">
              <h3 className="max-md:text-[20px] text-[26px] font-semibold capitalize">
                Statistik
              </h3>
              <div className="w-full grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 xl:flex-wrap items-center justify-center gap-4 max-lg:gap-8 max-md:gap-6">
                <StatCard
                  name="Total Pindaian"
                  value={profileData.stats.total_predictions}
                  icon={StastisticIcon}
                />
                <StatCard
                  name="Pindaian Hari Ini"
                  value={profileData.stats.predictions_today}
                  icon={StastisticIcon}
                />
                <StatCard
                  name="Pindaian Organik"
                  value={profileData.stats.organic_predictions}
                  icon={StastisticIcon}
                />
                <StatCard
                  name="Pindaian Anorganik"
                  value={profileData.stats.inorganic_predictions}
                  icon={StastisticIcon}
                />
              </div>
            </div>
          </div>
        </container>
      </div>
    </MainLayout>
  );
};

// Helper component for stat cards
const StatCard = ({ name, value, icon }) => (
  <div className="flex flex-col text-center max-w-[300px] max-sm:max-w-[240px] max-md:max-w-[270px] items-center justify-center gap-2 max-md:gap-0 outline-1 w-full py-8 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6">
    <img
      src={icon}
      className="h-[80px] w-[80px] max-md:w-[50px] max-md:h-[50px]"
      alt={name}
    />
    <p className="max-md:text-base pb-2 capitalize">{name}</p>
    <p className="max-md:text-[16px] text-[20px] font-semibold">{value}</p>
  </div>
);

export default ProfilePage;
