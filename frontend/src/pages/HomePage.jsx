import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Quest from "../components/Quest";
import Leaderboard from "../components/Leaderboard";
import OrganicIcon from "../assets/svg/iconoir_organic-food.svg";
import AnorganicIcon from "../assets/svg/solar_bottle-line-duotone.svg";
import TrashCamIcon from "../assets/svg/mage_camera-2.svg";
import DropDownIcon from "../assets/svg/tabler_drag-drop.svg";
import MainLayout from "../layouts/MainLayout.jsx";
import axios from "../api/AxiosInstance.jsx";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [notifSlug, setNotifSlug] = useState(null);
  const [quests, setQuests] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

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

    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

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

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/leaderboard");
        setLeaderboard(response.data.leaderboard);
        setCurrentUser(response.data.current_user);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    fetchLeaderboard();
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
                  {user ? user.name : "Guest"}
                </span>
              </h3>
              <p className="text-[12px] text-[#828282]">Eco Champion🌿</p>
            </div>

            <div className="flex flex-wrap justify-between items-start w-full gap-4">
              <div className="flex flex-col max-w-[560px] justify-start items-start w-full gap-4">
                <h3 className="text-[16px] font-semibold">Panduan</h3>
                <div className="min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6">
                  <a
                    href="#"
                    className="flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6"
                  >
                    <img
                      src={OrganicIcon}
                      className="h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]"
                      alt="Organic Icon"
                    />
                    <p className="max-md:text-base">Organik</p>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6"
                  >
                    <img
                      src={AnorganicIcon}
                      className="h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]"
                      alt="Anorganic Icon"
                    />
                    <p className="max-md:text-base">Anorganik</p>
                  </a>
                </div>
              </div>

              <div className="flex flex-col max-w-[560px] justify-start items-start w-full gap-4">
                <h3 className="text-[16px] font-semibold">Pindai Sampah</h3>
                <div className="min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6">
                  <a
                    href="#"
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
                    href="#"
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
              />
            </div>
          </container>
        </main>
      </div>
    </MainLayout>
  );
};

export default HomePage;
