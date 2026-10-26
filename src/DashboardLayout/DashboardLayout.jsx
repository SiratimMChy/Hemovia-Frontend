import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/Aside/Aside';
import DemoUserBadge from '../Components/DemoUserBadge/DemoUserBadge';

const DashboardLayout = () => {
    // Remember the user's theme when the dashboard opens
    useEffect(() => {
        // Set initial theme from localStorage
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);

        // Update theme if changed in another tab
        const handleStorageChange = (e) => {
            if (e.key === 'theme') {
                document.documentElement.setAttribute("data-theme", e.newValue);
            }
        };

        // Update theme when user clicks the theme button
        const handleThemeChange = (e) => {
            document.documentElement.setAttribute("data-theme", e.detail.theme);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('themeChange', handleThemeChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('themeChange', handleThemeChange);
        };
    }, []);

    return (
        <div className='min-h-screen flex bg-base-100 relative'>
            <Aside />
            <div className='flex-1 p-2 sm:p-4 md:p-5 bg-base-100 min-w-0 overflow-x-hidden'>
                <Outlet />
            </div>
            <DemoUserBadge />
        </div>
    );
};

export default DashboardLayout;