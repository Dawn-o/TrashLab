import { useEffect, useState } from 'react';
import OrganicIcon from "../assets/image/iconoir_organic-food.png";
import AnorganicIcon from "../assets/image/solar_bottle-line-duotone.png";
import Avatar from "../assets/image/Avatar.png";
import TrashCamIcon from "../assets/image/mage_camera-2.png";
import DropDownIcon from "../assets/image/tabler_drag-drop.png";
import CoinIcon from "../assets/image/mingcute_copper-coin-line.png";
import axios from 'axios';

const HomePage = () => {
    const [tabContent, setContent] = useState(() => {
        const storedValue = localStorage.getItem('tabContent');
        return storedValue ? JSON.parse(storedValue) : 0;
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.setItem('tabContent', tabContent);
    }, [tabContent]);

    useEffect(() => {
        // Ambil data user dari localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
    }, []);

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
                            <img className='max-md:w-[15px] max-md:h-[15px] w-[30px] h-[30px]' src={CoinIcon} alt="" />
                            {user ? (<p>Anda memiliki <span className='font-bold max-md:text-[11px] text-[20px]'>{user.points}</span> Poin</p>) : "Login terlebih dahulu!"}
                        </div>
                        <div className='rounded-full w-[45px] h-[45px]'><img src={Avatar} alt="" /></div>
                    </div>
                </div>
            </header>
            <main className='flex flex-col items-center justify-start px-6'>
                <container className='flex max-w-7xl w-full flex-col items-start justify-center gap-10 py-12'>
                    <div>
                        <h3 className='text-[20px] font-semibold'>Hello, <span className='text-primary'>{user ? (user.name) : "Guest"}</span></h3>
                        <p className='text-[12px] text-[#828282]'>Eco Champion🌿</p>
                    </div>

                    <div className='flex flex-wrap justify-between items-start w-full gap-4'>
                        <div className='flex flex-col max-w-[560px] justify-start items-start w-full gap-4'>
                            <h3 className='text-[16px] font-semibold'>TrashGuide</h3>
                            <div className='min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6'>

                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src={OrganicIcon} className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p className='max-md:text-base'>Organik</p>
                                </a>
                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src={AnorganicIcon} className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p className='max-md:text-base'>Anorganik</p>
                                </a>

                            </div>
                        </div>

                        <div className='flex flex-col max-w-[560px] justify-start items-start w-full gap-4'>
                            <h3 className='text-[16px] font-semibold'>Pindai Sampah</h3>
                            <div className='min-w-full flex gap-10 max-lg:gap-8 max-md:gap-6'>

                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src={TrashCamIcon} className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p className='max-md:text-base'>TrashCam</p>
                                </a>
                                <a href='#' className='flex flex-col items-center justify-center gap-2 outline-1 w-full py-6 max-md:py-4 outline-[#EBEBEB] rounded-[20px] bg-white p-6'>
                                    <img src={DropDownIcon} className='h-[45px] w-[45px] max-md:w-[30px] max-md:h-[30px]' alt="" />
                                    <p className='max-md:text-base'>TrashDrop</p>
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
                                <div className='flex flex-col gap-2 w-full py-6'>

                                    <div className='flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base'>
                                        <div className='flex flex-row items-center justify-start w-full gap-3 max-md:gap-2'>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.25 18.75C6.25 13.9175 10.0275 10 14.6875 10H15.3125C19.9725 10 23.75 13.9175 23.75 18.75C23.75 23.5825 19.9725 27.5 15.3125 27.5H14.6875C10.0275 27.5 6.25 23.5825 6.25 18.75Z" stroke="#EFBF04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.625 22.5V16.185C15.625 15.4675 15.625 15.1075 15.3375 15.0188C14.7038 14.8225 13.75 16.2487 13.75 16.2487M15.625 22.5L13.75 22.4988M15.625 22.5L17.5 22.4988M16.95 2.5L13.75 9.8725M22.5 2.5L18.9737 10.625M13.05 2.5L15 6.9925M7.5 2.5L11.0263 10.625" stroke="#EFBF04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <p>Nama Pengguna</p>
                                        </div>
                                        <div className='font-medium max-md:text-[9px] flex justify-center items-center max-md:gap-1 gap-2 outline-2 max-md:outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2'>
                                            <img className='max-md:w-[15px] max-md:h-[15px] w-[30px] h-[30px]' src={CoinIcon} alt="" />
                                            <span className='font-bold max-md:text-[11px] text-[20px]'>2000</span>
                                        </div>
                                    </div>

                                    <div className='flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base'>
                                        <div className='flex flex-row items-center justify-start w-full gap-3 max-md:gap-2'>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.25 18.75C6.25 13.9175 10.0275 10 14.6875 10H15.3125C19.9725 10 23.75 13.9175 23.75 18.75C23.75 23.5825 19.9725 27.5 15.3125 27.5H14.6875C10.0275 27.5 6.25 23.5825 6.25 18.75Z" stroke="#BCC6CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13.125 16.3975C13.225 15.4163 13.885 15 14.5725 15H15.405C16.0925 15 16.7512 15.4163 16.8512 16.3975C16.8817 16.7151 16.8817 17.0349 16.8512 17.3525C16.79 17.95 16.0675 18.6363 16.0675 18.6363L15 19.375C15 19.375 13.125 20.625 13.125 21.875C13.125 22.55 13.6713 22.5 14.3463 22.5H16.8512M16.95 2.5L13.75 9.8725M22.5 2.5L18.9737 10.625M13.05 2.5L15 6.9925M7.5 2.5L11.0263 10.625" stroke="#BCC6CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                            <p>Nama Pengguna</p>
                                        </div>
                                        <div className='font-medium max-md:text-[9px] flex justify-center items-center max-md:gap-1 gap-2 outline-2 max-md:outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2'>
                                            <img className='max-md:w-[15px] max-md:h-[15px] w-[30px] h-[30px]' src={CoinIcon} alt="" />
                                            <span className='font-bold max-md:text-[11px] text-[20px]'>1200</span>
                                        </div>
                                    </div>

                                    <div className='flex w-full gap-6 max-md:gap-2 border-b border-[#E8E8E8] pb-6 max-md:pb-2 max-md:text-base'>
                                        <div className='flex flex-row items-center justify-start w-full gap-3 max-md:gap-2'>
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.25 18.75C6.25 13.9175 10.0275 10 14.6875 10H15.3125C19.9725 10 23.75 13.9175 23.75 18.75C23.75 23.5825 19.9725 27.5 15.3125 27.5H14.6875C10.0275 27.5 6.25 23.5825 6.25 18.75Z" stroke="#CE8946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M13.125 16.3975C13.225 15.4163 13.8837 15 14.5725 15H15.405C16.0925 15 16.7512 15.4163 16.8512 16.3975C16.8817 16.7151 16.8817 17.0349 16.8512 17.3525C16.7687 18.1625 16.2138 18.75 15.6138 18.75M15.6138 18.75C16.2138 18.75 16.7687 19.3375 16.8512 20.1475C16.8817 20.4651 16.8817 20.7849 16.8512 21.1025C16.7512 22.0837 16.0925 22.5 15.405 22.5H14.5725C13.8837 22.5 13.225 22.0837 13.125 21.1025M15.6138 18.75H15.5387M16.95 2.5L13.75 9.8725M22.5 2.5L18.9737 10.625M13.05 2.5L15 6.9925M7.5 2.5L11.0263 10.625" stroke="#CE8946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <p>Nama Pengguna</p>
                                        </div>
                                        <div className='font-medium max-md:text-[9px] flex justify-center items-center max-md:gap-1 gap-2 outline-2 max-md:outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2'>
                                            <img className='max-md:w-[15px] max-md:h-[15px] w-[30px] h-[30px]' src={CoinIcon} alt="" />
                                            <span className='font-bold max-md:text-[11px] text-[20px]'>1000</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                </container>
            </main>
        </div>
    );
}

export default HomePage;
