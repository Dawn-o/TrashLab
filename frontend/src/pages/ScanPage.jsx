import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const ScanPage = () => {
    return (
        <MainLayout>
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

export default ScanPage;
