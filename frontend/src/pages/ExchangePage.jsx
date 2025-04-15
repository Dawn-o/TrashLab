import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CoinIcon from "../assets/svg/mingcute_copper-coin-line.svg";
import QuestionIcon from "../assets/svg/question.svg";
import axios from "../api/AxiosInstance";

const ExchangePage = () => {
    const [badges, setBadges] = useState([]);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/rewards');
                setBadges(response.data.rewards.BADGE);
            } catch (err) {
                setError('Failed to load badges');
            } finally {
                setLoading(false);
            }
        };

        fetchBadges();
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    const handleRedeem = async (badge) => {
        try {
            await axios.post('/rewards/redeem', {
                reward_id: badge.id
            });
            
            // Refresh badges after redemption
            const response = await axios.get('/rewards');
            setBadges(response.data.rewards.BADGE);
            setIsModalOpen(false);
            setError(null); // Clear any existing errors
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to redeem badge');
        }
    };

    return (
        <MainLayout>
            {isModalOpen && (
                <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white flex flex-col justify-start items-center p-12 rounded-xl max-w-sm w-full shadow-lg gap-8 relative">
                        <div className='flex justify-center flex-col text-center items-center gap-1'>
                            <img src={QuestionIcon} className='w-[100px] h-[100px]' alt="" />
                            <h3 className='text-center w-full font-semibold max-md:text-[16px] text-[20px]'>Apakah anda yakin?</h3>
                            <p className='font-medium max-md:text-base text-[16px] text-center'>
                                Untuk menukarkan {selectedBadge?.points_cost} poin Anda dengan {selectedBadge?.name}?
                            </p>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                        </div>
                        <div className='flex gap-4 justify-center items-center'>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setError(null); // Clear error when closing
                                }}
                                className="px-6 py-3 max-md:rounded-[8px] text-black hover:bg-grey-100/20 rounded-[12px]"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={() => handleRedeem(selectedBadge)}
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
                            <h3 className='max-md:text-[20px] text-[26px] font-semibold'>Badge Exchange</h3>
                            <p className='max-md:text-base text-[16px]'>Tukar poin yang anda miliki dengan berbagai badge keren!</p>
                            {loading ? (
                                <div className="w-full text-center py-8">Loading...</div>
                            ) : error ? (
                                <div className="w-full text-center py-8 text-red-500">{error}</div>
                            ) : (
                                <div className='w-full grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 xl:flex-wrap justify-center gap-4 max-lg:gap-8 max-md:gap-6'>
                                    {badges.map((badge) => (
                                        <div
                                            key={badge.id}
                                            className='flex flex-col text-center max-w-[300px] max-sm:max-w-[240px] max-md:max-w-[270px] items-center justify-center gap-2 outline-1 w-full py-8 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'
                                        >
                                            <img 
                                                src={`https://trashlab.rushel.my.id${badge.image_url}`} 
                                                className='h-[80px] w-[80px] max-md:w-[50px] max-md:h-[50px]' 
                                                alt={badge.name} 
                                            />
                                            <p className='max-md:text-base pb-4 max-md:pb-2'>{badge.name}</p>
                                            <div className='flex justify-center items-center pr-2 gap-2 max-md:gap-0 font-bold max-md:text-[11px]'>
                                                <img src={CoinIcon} alt="" className='h-[30px] w-[30px] max-md:h-[15px] max-md:s-[15px]' />
                                                {badge.points_cost}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (badge.can_redeem) {
                                                        setSelectedBadge(badge);
                                                        setIsModalOpen(true);
                                                    }
                                                }}
                                                className={`${
                                                    badge.can_redeem 
                                                        ? "bg-primary hover:bg-secondary cursor-pointer" 
                                                        : "bg-[#d9d9d9] cursor-not-allowed"
                                                } text-white rounded-[16px] max-md:rounded-[10px] px-6 max-md:px-4 py-2 max-md:py-1 max-md:text-base`}
                                            >
                                                {badge.can_redeem ? "Redeem" : "Redeemed"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </container>
                </main>
            </div>
        </MainLayout>
    );
}

export default ExchangePage;