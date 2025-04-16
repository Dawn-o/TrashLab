import FirstPlace from "../assets/svg/first-place.svg";
import SecondPlace from "../assets/svg/second-place.svg";
import ThirdPlace from "../assets/svg/third-place.svg";
import CoinIcon from "../assets/svg/mingcute_copper-coin-line.svg";
import Loading from "../components/Loading.jsx";

const Leaderboard = ({ leaderboard, currentUser, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[560px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start w-full gap-2">
      <h3 className="text-[16px] font-semibold">Leaderboard</h3>
      <div className="flex flex-col gap-2 w-full py-2">
        <div className="flex flex-col gap-2 w-full py-6">
          {/* Top leaderboard */}
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base ${
                currentUser && user.name === currentUser.name
              }`}
            >
              <div className="flex flex-row items-center justify-start w-full gap-3 max-md:gap-2">
                {user.rank <= 3 ? (
                  <img
                    src={
                      user.rank === 1
                        ? FirstPlace
                        : user.rank === 2
                        ? SecondPlace
                        : ThirdPlace
                    }
                    alt={`${user.rank} Place`}
                  />
                ) : (
                  <div className="flex justify-center items-center w-[30px] h-[30px] text-[#68A36F] font-semibold">
                    {user.rank}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <p className="font-medium">{user.name}</p>
                  {/* Add badge */}
                  <img
                    src={`https://trashlab.rushel.my.id${user.badge_url}`}
                    alt="Badge"
                    className="w-5 h-5 object-contain"
                  />
                  {currentUser && user.name === currentUser.name && (
                    <span className="text-xs text-[#68A36F]">(You)</span>
                  )}
                </div>
              </div>
              <div className="font-medium max-md:text-[9px] flex justify-center items-center max-md:gap-1 gap-2 outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2">
                <img
                  className="max-md:w-[15px] max-md:h-[15px] w-[30px] h-[30px]"
                  src={CoinIcon}
                  alt="Coin Icon"
                />
                <span className="font-bold max-md:text-[11px] text-[20px]">
                  {user.points}
                </span>
              </div>
            </div>
          ))}

          {/* Current user position if not in top 5 */}
          {currentUser && currentUser.rank > 5 && (
            <>
              <div className="w-full text-center text-[#828282] text-sm py-2">
                • • •
              </div>
              <div className="flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base">
                <div className="flex flex-row items-center justify-start w-full gap-3 max-md:gap-2">
                  <div className="flex justify-center items-center w-[30px] h-[30px] text-[#68A36F] font-semibold">
                    {currentUser.rank}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{currentUser.name}</p>
                    {/* Add badge for current user */}
                    <img
                      src={`https://trashlab.rushel.my.id${currentUser.badge_url}`}
                      alt="Badge"
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-xs text-[#68A36F]">(You)</span>
                  </div>
                </div>
                <div className="font-medium max-md:text-[9px] flex justify-center items-center max-md:gap-1 gap-2 outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2">
                  <img
                    className="max-md:w-[15px] max-md:h-[15px] w-[30px] h-[30px]"
                    src={CoinIcon}
                    alt="Coin Icon"
                  />
                  <span className="font-bold max-md:text-[11px] text-[20px]">
                    {currentUser.points}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;