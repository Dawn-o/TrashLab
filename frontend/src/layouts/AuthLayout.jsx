import React from 'react';
import Notification from '../components/Notification';
import Back from "../assets/svg/back.svg";


const AuthLayout = ({ children, notifSlug}) => {

    return (
        <div>
            <a href="/" className="absolute z-10 top-4 left-2 cursor-pointer">
                <img src={Back} alt="back" />
            </a>
            <main className='flex min-h-screen items-center justify-center relative'>
                {children}
            </main>
            <Notification notif={notifSlug} />
        </div>
    );
}

export default AuthLayout;
