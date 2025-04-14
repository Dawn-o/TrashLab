import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CoinIcon from "../assets/svg/mingcute_copper-coin-line.svg";
import GreenGuardianBadge from "../assets/svg/green-guardian-badge.svg";
import EcoWariorBadge from "../assets/svg/eco-warior-badge.svg";
import MasterRecyclerBadge from "../assets/svg/master-recycler-badge.svg";
import QuestionIcon from "../assets/svg/question.svg";

const ExchangePage = () => {
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const badges = [
        {
            id: 1,
            name: "Green Guardian",
            status: "redeem",
            image: GreenGuardianBadge,
            points: 100,
            popup: "organic"
        },
        {
            id: 2,
            name: "Eco Warior",
            status: "redeem",
            image: EcoWariorBadge,
            points: 200,
            popup: "organic"
        },
        {
            id: 3,
            name: "Master Recycler",
            status: "redeemed",
            image: MasterRecyclerBadge,
            points: 300,
            popup: "organic"
        },
        {
            id: 4,
            name: "Coming Soon",
            status: null,
            image: null,
            points: null,
            popup: null,
            comingSoon: true
        }

    ];
    return (
        <MainLayout>
            {isModalOpen && (
                <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white flex flex-col justify-start items-center p-12 rounded-xl max-w-sm w-full shadow-lg gap-8 relative">
                        <div className='flex justify-center flex-col text-center items-center gap-1'>
                            <img src={QuestionIcon} className='w-[100px] h-[100px]' alt="" />
                            <h3 className='text-center w-full font-semibold max-md:text-[16px] text-[20px]'>Apakah anda yakin?</h3>
                            <p className='font-medium max-md:text-base text-[16px] text-center'>Untuk menukarkan poin Anda dengan badge ini?</p>
                        </div>
                        {/* Tombol confirm */}
                        <div className='flex gap-4 justify-center items-center '>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                                className=" px-6 py-3 max-md:rounded-[8px] text-black hover:bg-grey-100/20 rounded-[12px"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Badge redeemed:", selectedBadge.id);
                                    // Tambahin logic redeem API call di sini
                                    setIsModalOpen(false);
                                }}
                                className="bg-primary text-white px-6 py-3 max-md:rounded-[8px] hover:bg-secondary rounded-[12px]"
                            >
                                Tukarkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='bg-[#f8f8f8]'>
                <main className='flex flex-col items-center justify-start px-6'>
                    <container className='flex max-w-7xl w-full flex-col items-start justify-center gap-10 py-12'>
                        <div className='flex flex-col justify-between items-start w-full gap-4'>
                            <h3 className='max-md:text-[20px] text-[26px] font-semibold'>TrashGuide</h3>
                            <p className='max-md:text-base text-[16px]'>Tukar poin yang anda miliki dengan berbagai badge keren!</p>
                            <div className='w-full xl:flex max-xl:grid max-xl:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 xl:flex-wrap justify-start gap-4 max-lg:gap-8 max-md:gap-6'>
                                {badges.map((badge) => (
                                    <div
                                        key={badge.id}
                                        className='flex flex-col text-center max-w-[300px] max-sm:max-w-[160px] max-md:max-w-[210px] items-center justify-center gap-2 outline-1 w-full py-8 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'
                                    >
                                        {badge.comingSoon ? (
                                            <p className='text-grey-500'>Coming Soon</p>
                                        ) : (
                                            <>
                                                <img src={badge.image} className='h-[80px] w-[80px] max-md:w-[50px] max-md:h-[50px]' alt="" />
                                                <p className='max-md:text-base pb-4 max-md:pb-2 capitalize'>
                                                    {badge.name} <span>badge</span>
                                                </p>
                                                <div className='flex justify-center items-center pr-2 gap-2 max-md:gap-0 font-bold max-md:text-[11px]'>
                                                    <img src={CoinIcon} alt="" className='h-[30px] w-[30px] max-md:h-[15px] max-md:s-[15px]' />
                                                    {badge.points}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (badge.status === "redeem") {
                                                            setSelectedBadge(badge);
                                                            setIsModalOpen(true);
                                                        }
                                                    }}
                                                    className={`${badge.status === "redeemed" ? "bg-[#d9d9d9]" : "bg-primary hover:bg-secondary cursor-pointer"
                                                        } capitalize text-white rounded-[16px] max-md:rounded-[10px] px-6 max-md:px-4 py-2 max-md:py-1 max-md:text-base`}
                                                >
                                                    {badge.status}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </container>
                </main>
            </div>
        </MainLayout>
    );
}

export default ExchangePage;
