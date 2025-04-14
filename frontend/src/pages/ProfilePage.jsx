import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Avatar from "../assets/images/avatar.png";
import GreenGuardianBadge from "../assets/svg/green-guardian-badge.svg";
import EcoWariorBadge from "../assets/svg/eco-warior-badge.svg";
import MasterRecyclerBadge from "../assets/svg/master-recycler-badge.svg";
import StastisticIcon from "../assets/svg/iconoir_organic-food.svg";
import Arrow from "../assets/svg/arrow-right.svg";

const ProfilePage = () => {
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

    const statistic = {
        totalScan: {
            name: "Total Pindaian",
            image: StastisticIcon,
            value: 47,
        },
        todayScan: {
            name: "Pindaian Hari Ini",
            image: StastisticIcon,
            value: 2,
        },
        organicScan: {
            name: "Pindaian Organik",
            image: StastisticIcon,
            value: 22,
        },
        anorganicScan: {
            name: "Pindaian Anorganik",
            image: StastisticIcon,
            value: 25,
        },
    };

    return (
        <MainLayout>
            <div className='h-[calc(100vh - 200px)] flex flex-col justify-start items-center max-md:gap-4 gap-8'>
                <div className='w-full flex flex-col justify-end relative  items-center bg-secondary h-[200px] max-md:h-[140px]'>
                    <img className='outline-[1px] outline-white absolute top-[140px] max-md:top-[80px] rounded-full' src={Avatar} />
                </div>
                <container className='flex max-w-7xl w-full flex-col items-start justify-center gap-10 max-md:py-2 px-6'>
                    <div className="relative w-full flex flex-col justify-start items-center py-12 gap-8">
                        <div className='w-full flex flex-col justify-start items-center'>
                            <h3>Jogn Doe</h3>
                            <p>johndoe@gmail.com</p>
                            <p className='text-[12px]'>Rank <span className='text-primary'>#293</span></p>
                        </div>
                        <div className='flex flex-col justify-between items-start w-full gap-4'>
                            <h3 className='max-md:text-[20px] text-[26px] font-semibold capitalize'>Badge Aktif</h3>
                            <button className='flex w-full justify-between items-center outline-1 outline-[#C9C9C9] rounded-[10px] bg-white hover:bg-grey-100 px-6 py-2'>
                                <div className='flex justify-start items-center gap-4 max-md:gap-2'>
                                    <img src={MasterRecyclerBadge} className='w-[40px] h-[40px]' alt="" />
                                    <h4>Master Recycler</h4>
                                </div>
                                <img src={Arrow} className='w-[20px] h-[20px] rotate-90' alt="" />
                            </button>
                        </div>
                        <div className='flex flex-col justify-between items-start w-full gap-4'>
                            <h3 className='max-md:text-[20px] text-[26px] font-semibold capitalize'>Statistik</h3>
                            <div className='w-full grid grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 xl:flex-wrap items-center justify-center gap-4 max-lg:gap-8 max-md:gap-6'>
                                {Object.entries(statistic).map(([key, stat]) => (
                                    <div
                                        key={key}
                                        className='flex flex-col text-center max-w-[300px] max-sm:max-w-[240px] max-md:max-w-[270px] items-center justify-center gap-2 max-md:gap-0 outline-1 w-full py-8 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'
                                    >
                                        <img src={stat.image} className='h-[80px] w-[80px] max-md:w-[50px] max-md:h-[50px]' alt={stat.name} />
                                        <p className='max-md:text-base pb-2 capitalize'>{stat.name}</p>
                                        <p className='max-md:text-[16px] text-[20px] font-semibold'>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </container>
            </div>
        </MainLayout>
    );
}

export default ProfilePage;
