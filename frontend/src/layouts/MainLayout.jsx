import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Notification from '../components/Notification.jsx';

const MainLayout = ({ children, notifSlug}) => {
    const pageTab = ["/home", "/exchange", "/scan", "/history"];
    const activeTab = pageTab.indexOf(window.location.pathname);

    return (
        <div>
            <Header
                activeTab={activeTab}
                avatar="/avatar.png"
            />
            <main className='relative pt-[80px] max-md:pt-[60px]'>
                {children}
            </main>
            <Notification notif={notifSlug} />
        </div>
    );
}

export default MainLayout;
