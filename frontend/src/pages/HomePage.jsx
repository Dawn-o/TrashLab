import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Quest from "../components/Quest";
import Leaderboard from "../components/Leaderboard";
import OrganicIcon from "../assets/svg/iconoir_organic-food.svg";
import AnorganicIcon from "../assets/svg/solar_bottle-line-duotone.svg";
import TrashCamIcon from "../assets/svg/mage_camera-2.svg";
import DropDownIcon from "../assets/svg/tabler_drag-drop.svg";
import MainLayout from "../layouts/MainLayout.jsx";
import { getUserProfile } from "../services/apiServices.jsx";
import axios from "../api/AxiosInstance.jsx";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [notifSlug, setNotifSlug] = useState(null);
  const [quests, setQuests] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true); // State untuk loading leaderboard
  const [nameLocal, setNameLocal] = useState(null);
  const [currentBadge, setCurrentBadge] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL parameters and notifications
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const notif = params.get("notif");
    if (notif) {
      setNotifSlug(notif);
      params.delete("notif");
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      );
    }
  }, [location, navigate]);

  // Handle user data and profile fetching
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userObj = JSON.parse(userString);
      setNameLocal(userObj.name);
      setUser(userObj);
    }

    const fetchData = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.profile);
      } catch (error) {
        console.error("Gagal ambil profile:", error);
      }
    };

    fetchData();
  }, []);

  // Handle quests fetching
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await axios.get("/quest/status");
        setQuests(response.data.quests);
      } catch (error) {
        console.error("Failed to fetch quests:", error);
      }
    };

    fetchQuests();
  }, []);

  // Handle leaderboard fetching
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoadingLeaderboard(true); // Set loading state to true
        const response = await axios.get("/leaderboard");
        setLeaderboard(response.data.leaderboard);
        setCurrentUser(response.data.current_user);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setIsLoadingLeaderboard(false); // Set loading state to false
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const response = await axios.get("/badges");
        const activeBadge = response.data.badges.find(
          (badge) => badge.is_active
        );

        // Remove "Badge" word from name and set default to "TrashLab Rookie"
        const formatBadgeName = (name) => {
          if (!name) return "TrashLab Rookie";
          return name.replace(" Badge", "");
        };

        setCurrentBadge({
          url: activeBadge?.image_url || response.data.default_badge.image_url,
          name: formatBadgeName(activeBadge?.name) || "TrashLab Rookie",
        });
      } catch (error) {
        console.error("Failed to fetch badge:", error);
        // Set default badge on error without referencing undefined response
        setCurrentBadge({
          url: "", // Set empty string or a default fallback URL
          name: "TrashLab Rookie",
        });
      }
    };

    fetchBadge();
  }, []);

  return (
    <MainLayout notifSlug={notifSlug}>
      <div className="bg-[#f8f8f8]">
        <main className="flex flex-col items-center justify-start px-6">
          <container className="flex max-w-7xl w-full flex-col items-start justify-center gap-10 py-12">
            <div>
              <h3 className="text-[20px] font-semibold">
                Hello,{" "}
                <span className="text-primary">
                  {user ? user.name : nameLocal ? nameLocal : "..."}
                </span>
              </h3>
              <div className="flex items-center gap-2">
                {currentBadge && (
                  <>
                    <img
                      src={`https://trashlab.rushel.my.id${currentBadge.url}`}
                      alt="Current Badge"
                      className="w-6 h-6 object-contain"
                    />
                    <p className="text-[16px] font-medium text-grey-500">
                      {currentBadge.name}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-start w-full gap-4">
              <div className="flex flex-col max-w-[560px] justify-start items-start w-full gap-4">
                <h3 className="text-[16px] font-semibold">TrashGuide</h3>
                <div className="min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6">
                  <button
                    onClick={() =>
                      navigate("/dashboard/panduan/sampah_organik")
                    }
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6"
                  >
                    <img
                      src={OrganicIcon}
                      className="h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]"
                      alt=""
                    />
                    <p className="max-md:text-base">Organik</p>
                  </button>
                  <button
                    onClick={() =>
                      navigate("/dashboard/panduan/sampah_anorganik")
                    }
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6"
                  >
                    <img
                      src={AnorganicIcon}
                      className="h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]"
                      alt=""
                    />
                    <p className="max-md:text-base">Anorganik</p>
                  </button>
                </div>
              </div>

              <div className="flex flex-col max-w-[560px] justify-start items-start w-full gap-4">
                <h3 className="text-[16px] font-semibold">Pindai Sampah</h3>
                <div className="min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6">
                  <a
                    href="/dashboard/pindai?use=camera"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/dashboard/pindai?use=camera";
                    }}
                    className="flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6"
                  >
                    <img
                      src={TrashCamIcon}
                      className="h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]"
                      alt="TrashCam Icon"
                    />
                    <p className="max-md:text-base">Ambil Photo</p>
                  </a>
                  <a
                    href="/dashboard/pindai?use=upload"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/dashboard/pindai?use=upload";
                    }}
                    className="flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6"
                  >
                    <img
                      src={DropDownIcon}
                      className="h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]"
                      alt="TrashDrop Icon"
                    />
                    <p className="max-md:text-base">Unggah Photo</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-row max-lg:flex-wrap justify-between items-start w-full gap-16 max-md:gap-4">
              <Quest quests={quests} />
              <Leaderboard
                leaderboard={leaderboard}
                currentUser={currentUser}
                isLoading={isLoadingLeaderboard}
              />
            </div>
          </container>
        </main>
      </div>
    </MainLayout>
  );
};

export default HomePage;
