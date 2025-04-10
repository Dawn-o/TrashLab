import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [tabContent, setContent] = useState(() => {
        const storedValue = localStorage.getItem('tabContent');
        return storedValue ? JSON.parse(storedValue) : 0;
    });

    useEffect(()=>{
        localStorage.setItem('tabContent', tabContent);
    }, [tabContent]); 

    const TabButtonClass = 'flex w-full cursor-pointer justify-center items-center font-medium max-md:text-[12px] rounded-[10px] py-4 max-md:py-3 px-12 max-md:px-2 transition-all duration-100';

    const activeTab = 'bg-[#68A36F] text-white';
    const inactiveTab = 'text-[#828282]';

    return (
        <div className='bg-[#f8f8f8]'>
            <header className='flex justify-center p-6 max-md:py-3 bg-white text-[#1e1e1e] outline-1 outline-[#E8F0EB]'>
                <div className='flex justify-between max-md:justify-end items-center max-w-7xl w-full px-2 max-md:relative'>
                    <nav className='max-md:absolute max-md:right-[150%]'>
                        <ul className='flex gap-6 items-center'>
                            <li><a href="#">Beranda</a></li>
                            <li><a href="#">Tukar Poin</a></li>
                            <li><a href="#">Pindai Sampah</a></li>
                            <li><a href="#">Riwayat Pindai</a></li>
                        </ul>
                    </nav>
                    <div className='flex gap-12 max-md:gap-8 max-sm:gap-4 items-center'>
                        <div className='font-medium max-md:text-[9px] flex justify-center items-center max-md:gap-1 gap-2 outline-2 max-md:outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2'>
                            <img className='max-md:w-[15px] max-md:h-[15px] w-[30px] h-[30px]' src="mingcute_copper-coin-line.png" alt="" />
                            <p>Anda memiliki <span className='font-bold max-md:text-[11px] text-[20px]'>0</span> Poin</p></div>
                        <div className='rounded-full w-[45px] h-[45px]'><img src="/profile.png" alt="" /></div>
                    </div>
                </div>
            </header>
            <main className='flex flex-col items-center justify-start px-6'>
                <container className='flex max-w-7xl w-full flex-col items-start justify-center gap-10 py-12'>
                    <div>
                        <h3 className='text-[20px] font-semibold'>Hello, <span className='text-primary'>John Doe!</span></h3>
                        <p className='text-[12px] text-[#828282]'>Eco Champion🌿</p>
                    </div>

                    <div className='flex flex-wrap justify-between items-start w-full gap-4'>
                        <div className='flex flex-col max-w-[560px] justify-start items-start w-full gap-4'>
                            <h3 className='text-[16px] font-semibold'>TrashGuide</h3>
                            <div className='min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6'>

                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src="iconoir_organic-food.png" className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p>Organik</p>
                                </a>
                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src="solar_bottle-line-duotone.png" className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p>Anorganik</p>
                                </a>

                            </div>
                        </div>

                        <div className='flex flex-col max-w-[560px] justify-start items-start w-full gap-4'>
                            <h3 className='text-[16px] font-semibold'>Pindai Sampah</h3>
                            <div className='min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6'>

                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src="mage_camera-2.png" className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p>TrashCam</p>
                                </a>
                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src="tabler_drag-drop.png" className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p>TrashDrop</p>
                                </a>

                            </div>
                        </div>

                    </div>

                    <div className='w-full flex flex-col items-center justify-start gap-4'>
                        <div className='flex w-full outline-1 outline-[#EBEBEB] rounded-[12px] bg-white p-0.5'>
                            <button onClick={() => setContent(0)} className={`${TabButtonClass} ${tabContent === 0 ? activeTab : inactiveTab}`}>TrashQuest</button>
                            <button onClick={() => setContent(1)} className={`${TabButtonClass} ${tabContent === 1 ? activeTab : inactiveTab}`}>Leaderboard</button>
                        </div>

                        {tabContent === 0 ? (
                            <div className='flex flex-col gap-2 w-full py-6'>

                                <div className='flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base'>
                                    <div className='flex flex-col justify-start w-full gap-3 max-md:gap-1'>
                                        <h4 className='font-semibold'>Title</h4>
                                        <p>Description</p>
                                    </div>
                                    <div className='flex flex-col items-end justify-center gap-2'>
                                        <p className='text-grey-300'>8m ago</p>
                                        <div className='bg-green p-1 rounded-[8px] text-white'>Complete</div>
                                    </div>
                                </div>

                                <div className='flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base'>
                                    <div className='flex flex-col justify-start w-full gap-3 max-md:gap-1'>
                                        <h4 className='font-semibold'>Title</h4>
                                        <p>Description</p>
                                    </div>
                                    <div className='flex flex-col items-end justify-center gap-2'>
                                        <p className='text-grey-300'>8m ago</p>
                                        <div className='bg-green p-1 rounded-[8px] text-white'>Complete</div>
                                    </div>
                                </div>

                                <div className='flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base'>
                                    <div className='flex flex-col justify-start w-full gap-3 max-md:gap-1'>
                                        <h4 className='font-semibold'>Title</h4>
                                        <p>Description</p>
                                    </div>
                                    <div className='flex flex-col items-end justify-center gap-2'>
                                        <p className='text-grey-300'>8m ago</p>
                                        <div className='bg-red p-1 rounded-[8px] text-white'>Incomplete</div>
                                    </div>
                                </div>

                                <div className='flex w-full py-2 justify-end items-center text-grey-500 font-medium max-md:text-base'>
                                    <a href="">Show more</a>
                                </div>

                            </div>
                        ) : (
                            <div className='flex flex-col gap-2 w-full py-6'>
                                Konten
                            </div>
                        )}

                    </div>
                </container>
            </main>
        </div>
    );
}

export default HomePage;
