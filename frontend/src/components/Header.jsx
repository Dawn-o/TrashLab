import React from 'react';
import HomeIcon from "../assets/svg/home.svg";
import HomeIconActive from "../assets/svg/home-white.svg";
import ExchangeIcon from "../assets/svg/card-exchange.svg";
import ExchangeIconActive from "../assets/svg/card-exchange-white.svg";
import ScanIcon from "../assets/svg/scan.svg";
import ScanIconActive from "../assets/svg/scan-white.svg";
import HistoryIcon from "../assets/svg/history.svg";
import HistoryIconActive from "../assets/svg/history-white.svg";


const Header = ({ activeTab, points, avatar }) => {
    const navItems = ["Beranda", "Tukar Poin", "Pindai Sampah", "Riwayat Pindai"];
    const paths = ["/home", "/exchange", "/scan", "/history"];
    const icons = [HomeIcon, ExchangeIcon, ScanIcon, HistoryIcon];
    const activeIcons = [HomeIconActive, ExchangeIconActive, ScanIconActive, HistoryIconActive];


    return (
        <header className='flex justify-center p-3 max-md:py-2 bg-white text-[#1e1e1e] outline-1 outline-[#E8F0EB]'>
            <div className='flex justify-between max-md:justify-end items-center max-w-7xl w-full px-2 max-md:relative'>
                <nav className='max-md:absolute max-md:right-[150%]'>
                    <ul className='flex gap-6 items-center'>
                        {navItems.map((item, index) => {
                            return (
                                <li key={index} className={`font-medium text-[18px] px-2 py-4 max-md:text-[12px] rounded-[8px] max-md:rounded-[5px]  ${activeTab === index ? 'text-white bg-green' : 'text-black'}`}>
                                    <a className='flex flex-row gap-2 justify-start items-center' href={paths[index]}>
                                        <img src={activeTab === index ? (activeIcons[index]) : (icons[index])} alt={`${item} icon`} className='text-red-400' />
                                        {item}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className='flex gap-12 max-md:gap-8 max-sm:gap-4 items-center'>
                    <div className='font-medium max-md:text-[9px] flex justify-center items-center max-md:gap-1 gap-2 outline-2 max-md:outline-1 outline-[#EBEBEB] rounded-[8px] max-md:rounded-[5px] py-2 px-4 max-md:p-2'>
                        <svg className='md:h-[30px] md:w-[30px]' width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 1.75C10.9519 1.75 13.75 4.54813 13.75 8C13.75 11.4519 10.9519 14.25 7.5 14.25C4.04813 14.25 1.25 11.4519 1.25 8C1.25 4.54813 4.04813 1.75 7.5 1.75ZM7.5 3C6.17392 3 4.90215 3.52678 3.96447 4.46447C3.02678 5.40215 2.5 6.67392 2.5 8C2.5 9.32608 3.02678 10.5979 3.96447 11.5355C4.90215 12.4732 6.17392 13 7.5 13C8.82608 13 10.0979 12.4732 11.0355 11.5355C11.9732 10.5979 12.5 9.32608 12.5 8C12.5 6.67392 11.9732 5.40215 11.0355 4.46447C10.0979 3.52678 8.82608 3 7.5 3ZM6.61625 5.34812C6.83752 5.127 7.13367 4.99687 7.44621 4.98345C7.75875 4.97003 8.06496 5.07428 8.30437 5.27562L8.38375 5.34812L10.1519 7.11625C10.373 7.33752 10.5031 7.63367 10.5165 7.94621C10.53 8.25875 10.4257 8.56496 10.2244 8.80437L10.1519 8.88375L8.38375 10.6519C8.16248 10.873 7.86633 11.0031 7.55379 11.0165C7.24125 11.03 6.93504 10.9257 6.69563 10.7244L6.61625 10.6519L4.84812 8.88375C4.627 8.66248 4.49687 8.36633 4.48345 8.05379C4.47003 7.74125 4.57428 7.43504 4.77562 7.19563L4.84812 7.11625L6.61625 5.34812ZM7.5 6.2325L5.7325 8L7.5 9.7675L9.2675 8L7.5 6.2325Z" fill="#68A36F" />
                        </svg>

                        <p>Anda memiliki <span className='font-bold max-md:text-[11px] text-[20px]'>{points}</span> Poin</p>
                    </div>
                    <div className='rounded-full w-[45px] h-[45px]'><img src={avatar ? avatar : "/avatar"} alt="Avatar" /></div>
                </div>
            </div>
        </header>
    );
}

export default Header;
