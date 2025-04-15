import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import GreenGuardianBadge from "../assets/svg/green-guardian-badge.svg";
import EcoWariorBadge from "../assets/svg/eco-warior-badge.svg";
import MasterRecyclerBadge from "../assets/svg/master-recycler-badge.svg";
import StastisticIcon from "../assets/svg/iconoir_organic-food.svg";
import Arrow from "../assets/svg/arrow-right.svg";
import axios from '../api/AxiosInstance';

const ProfilePage = () => {
    const [isOpenSelection, setIsOpenSelection] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getInitials = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.name) return '?';
        return userData.name.charAt(0).toUpperCase();
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/profile');
                setProfileData(response.data.profile);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const toggleSelection = () => {
        setIsOpenSelection(prev => !prev);
    };

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
            name: "Eco Warrior",
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

    if (loading) return <MainLayout><div className="flex items-center justify-center h-screen">Loading...</div></MainLayout>;
    if (error) return <MainLayout><div className="flex items-center justify-center h-screen text-red-500">{error}</div></MainLayout>;
    if (!profileData) return null;

    return (
        <MainLayout>
            <div className='h-[calc(100vh - 200px)] flex flex-col justify-start items-center max-md:gap-4 gap-8'>
                <div className='w-full flex flex-col justify-end relative items-center bg-secondary h-[200px] max-md:h-[140px]'>
                    <div 
                        className='absolute top-[140px] max-md:top-[80px] rounded-full w-[100px] h-[100px] 
                        bg-white text-secondary flex items-center justify-center 
                        text-[40px] font-semibold border-4 border-white'
                    >
                        {getInitials()}
                    </div>
                </div>
                <container className='flex max-w-7xl w-full flex-col items-start justify-center gap-10 max-md:py-2 px-6'>
                    <div className="relative w-full flex flex-col justify-start items-center py-6 gap-8">
                        <div className='w-full flex flex-col justify-start items-center'>
                            <h3>{profileData.name}</h3>
                            <p>{profileData.email}</p>
                            <p className='text-[12px]'>Rank <span className='text-primary'>#{profileData.rank}</span></p>
                        </div>
                        <div className='flex flex-col relative justify-between items-start w-full gap-4'>
                            <h3 className='max-md:text-[20px] text-[26px] font-semibold capitalize'>Badge Aktif</h3>
                            <button
                                onClick={toggleSelection}
                                className='flex w-full justify-between cursor-pointer items-center outline-1 outline-[#C9C9C9] rounded-[10px] bg-white hover:bg-grey-100 px-6 py-2'>
                                <div className='flex justify-start items-center gap-4 max-md:gap-2'>
                                    <img src={MasterRecyclerBadge} className='w-[40px] h-[40px]' alt="" />
                                    <h4>Master Recycler</h4>
                                </div>
                                <img
                                    src={Arrow}
                                    className={`w-[20px] h-[20px] transition-transform duration-200 ${isOpenSelection ? 'rotate-270' : 'rotate-90'}`}
                                    alt="arrow"
                                />
                            </button>

                            <div className='w-full relative h-0'>
                                {isOpenSelection && (
                                    <div className='flex flex-col justify-start absolute items-center w-full outline-1 outline-[#C9C9C9] rounded-[10px] gap-0'>
                                        {badges.map((badge) => {
                                            if (badge.comingSoon) return null;

                                            return (
                                                <button
                                                    key={badge.id}
                                                    className="flex w-full justify-between items-center bg-white hover:bg-grey-100 px-6 py-2"
                                                >
                                                    <div className="flex justify-start items-center gap-4 max-md:gap-2">
                                                        <img src={badge.image} className="w-[40px] h-[40px]" alt={badge.name} />
                                                        <h4>{badge.name}</h4>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col justify-between items-start w-full gap-4'>
                            <h3 className='max-md:text-[20px] text-[26px] font-semibold capitalize'>Statistik</h3>
                            <div className='w-full grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 xl:flex-wrap items-center justify-center gap-4 max-lg:gap-8 max-md:gap-6'>
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
}

// Helper component for stat cards
const StatCard = ({ name, value, icon }) => (
    <div className='flex flex-col text-center max-w-[300px] max-sm:max-w-[240px] max-md:max-w-[270px] items-center justify-center gap-2 max-md:gap-0 outline-1 w-full py-8 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
        <img src={icon} className='h-[80px] w-[80px] max-md:w-[50px] max-md:h-[50px]' alt={name} />
        <p className='max-md:text-base pb-2 capitalize'>{name}</p>
        <p className='max-md:text-[16px] text-[20px] font-semibold'>{value}</p>
    </div>
);

export default ProfilePage;
