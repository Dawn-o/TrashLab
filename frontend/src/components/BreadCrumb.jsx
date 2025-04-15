import React from 'react';
import Arrow from '../assets/svg/arrow-right.svg';

const BreadCrumb = ({ menu, submenu }) => {
    return (
        <div className='flex justify-start items-center gap-2 w-full max-md:text-[16px] text-[24px] max-w-7xl'>
            {menu}<img src={Arrow} alt="" />{submenu}
        </div>
    );
}

export default BreadCrumb;
