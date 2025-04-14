import { questTypes } from "../configs/questTypes";

const Quest = ({ quests }) => {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-2">
      <h3 className="text-[16px] font-semibold">Misi Harian</h3>
      <div className="flex flex-col gap-2 w-full py-6">
        {quests ? (
          <>
            {questTypes.map((type) => (
              <div
                key={type.key}
                className="flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] max-md:text-base"
              >
                <div className="flex flex-col justify-center w-full gap-3 max-md:gap-1">
                  <p>{type.name(quests)}</p>
                </div>
                <div className="flex flex-col w-full items-end justify-center gap-2 pb-6 max-md:pb-2">
                  <p className="text-grey-300">+{type.bonus(quests)} points</p>
                  <div
                    className={`${
                      type.completed(quests)
                        ? "bg-green text-white"
                        : "outline-[#ECECEC] outline-1 text-grey-500"
                    } p-1 max-md:py-0.5 px-2 rounded-[8px] max-md:rounded-[6px] max-md:text-[8px]`}
                  >
                    {type.completed(quests) ? "Complete" : type.progress(quests)}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] max-md:text-base">
              <div className="flex flex-col justify-center w-full gap-3 max-md:gap-1">
                <p>Scan 10 Sampah</p>
              </div>
              <div className="flex flex-col w-full items-end justify-center gap-2 pb-6 max-md:pb-2">
                <p className="text-grey-300">+25 points</p>
                <div className="outline-[#ECECEC] outline-1 text-grey-500 p-1 max-md:py-0.5 px-2 rounded-[8px] max-md:rounded-[6px] max-md:text-[8px]">
                  0/10
                </div>
              </div>
            </div>

            <div className="flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] max-md:text-base">
              <div className="flex flex-col justify-center w-full gap-3 max-md:gap-1">
                <p>Scan 5 Sampah Organik</p>
              </div>
              <div className="flex flex-col w-full items-end justify-center gap-2 pb-6 max-md:pb-2">
                <p className="text-grey-300">+25 points</p>
                <div className="outline-[#ECECEC] outline-1 text-grey-500 p-1 max-md:py-0.5 px-2 rounded-[8px] max-md:rounded-[6px] max-md:text-[8px]">
                  0/5
                </div>
              </div>
            </div>

            <div className="flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] max-md:text-base">
              <div className="flex flex-col justify-center w-full gap-3 max-md:gap-1">
                <p>Scan 5 Sampah Anorganik</p>
              </div>
              <div className="flex flex-col w-full items-end justify-center gap-2 pb-6 max-md:pb-2">
                <p className="text-grey-300">+25 points</p>
                <div className="outline-[#ECECEC] outline-1 text-grey-500 p-1 max-md:py-0.5 px-2 rounded-[8px] max-md:rounded-[6px] max-md:text-[8px]">
                  0/5
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quest;