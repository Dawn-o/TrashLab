import React from 'react';
import MainLayout from '../layouts/MainLayout';
import OrganicVector from '../assets/svg/organic-vector.svg';
import Home from '../assets/svg/home.svg';
import Arrow from '../assets/svg/arrow-right.svg';
import Check from '../assets/svg/check-round.svg';

const OrganikPage = () => {
    return (
        <MainLayout>
            <div className='h-[calc(100vh - 200px)] flex flex-col justify-start items-center bg-secondary py-10 max-md:gap-4 '>
                <img src={OrganicVector} alt="" />
                <div className="relative w-full flex flex-col justify-start items-center">
                    <div className='absolute top-0 left-0 bg-[#f8f8f8] min-h-[30vw] max-lg:min-h-[90vh] rounded-t-[50px] w-full'>
                        <div className='flex flex-col justify-start items-center max-md:gap-2 gap-6 py-10 px-8'>
                            <div className='flex justify-start items-center gap-2 w-full max-w-7xl'>
                                <img src={Home} alt="" className='' />
                                <p className='flex justify-start items-center gap-2'>Beranda <img src={Arrow} alt="" /> <span className='text-green font-bold'>Organik</span></p>
                            </div>
                            <div className='flex w-full max-w-7xl justify-start items-center gap-2 outline-1 outline-[#ececec] rounded-[5px] bg-white p-2'>
                                <img src={Check} alt="" />
                                <p className='capitalize text-[16px] font-semibold'>Yang Bisa Kamu Lakukan</p>
                            </div>
                            <p className='text-base text-[#4B5563] text-center'>Organik adalah produk yang dihasilkan dari proses alami tanpa campuran bahan kimia.</p>
                            <p className='text-base text-[#4B5563] text-center'>Produk organik memiliki banyak manfaat bagi kesehatan dan lingkungan.</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default OrganikPage;
