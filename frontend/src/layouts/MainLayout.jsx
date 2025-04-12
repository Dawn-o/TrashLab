import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import HomePage from '../pages/HomePage.jsx';
import ExchangePage from '../pages/ExchangePage.jsx';
import ScanPage from '../pages/ScanPage.jsx';
import HistoryPage from '../pages/HistoryPage.jsx';

const MainLayout = ({ children }) => {
    const pageTab = ["/home", "/exchange", "/scan", "/history"];
    const activeTab = pageTab.indexOf(window.location.pathname);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            if (userData) setUser(userData);
        } catch (err) {
            console.error("User data corrupted 🫠:", err);
        }
    }, []);

    const points = user?.points;

    return (
        <div>
            <Header
                activeTab={activeTab}
                avatar="/avatar.png"
                points={points}
            />
            <main>
                {children}
            </main>
        </div>
    );
}

export default MainLayout;
