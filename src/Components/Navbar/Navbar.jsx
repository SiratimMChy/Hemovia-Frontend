import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router';
import { signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';
import { MdBloodtype } from 'react-icons/md';
import { useNavigate } from 'react-router';
import NavbarNavLinks from './NavbarNavLinks';
import ThemeToggle from './ThemeToggle';
import NavbarUserMenu from './NavbarUserMenu';

const Navbar = () => {
    const { user, role } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Theme state management
    const [isChecked, setIsChecked] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    const handleThemeChange = () => {
        setIsChecked(prev => {
            const newState = !prev;
            const theme = newState ? "dark" : "light";
            localStorage.setItem("theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            
            // Dispatch custom event for other components to listen
            window.dispatchEvent(new CustomEvent('themeChange', { 
                detail: { theme } 
            }));
            
            return newState;
        });
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsChecked(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsChecked(false);
        }
    }, []);
    
    const handleSignOut = () => {
        signOut(auth);
        navigate("/login");
    }
    
    const getDashboardPath = () => {
        if (role === 'admin') {
            return '/dashboard/admindashboard';
        }
        if (role === 'donor') {
            return '/dashboard/donordashboard';
        }
        if (role === 'volunteer') {
            return '/dashboard/volunteerdashboard';
        }
    }
    
    return (
        <div className="navbar bg-base-100 shadow-sm border-b border-base-300 h-15 lg:px-30 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-64 max-w-[90vw] p-2 shadow-lg border border-base-300 space-y-1">
                        <NavbarNavLinks user={user} isMobile={true} />
                        <li className="block lg:hidden pt-2 border-t border-base-content/10 mt-2">
                            <div className='flex items-center justify-between py-2'>
                                <span className="font-semibold text-sm text-base-content">Theme</span>
                                <ThemeToggle isChecked={isChecked} handleThemeChange={handleThemeChange} />
                            </div>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2 select-none">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                        <MdBloodtype className="text-white" size={18} />
                    </div>
                    <span className="text-lg md:text-xl font-extrabold tracking-tight text-base-content">
                        Hemovia
                    </span>
                </Link>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-6">
                    <NavbarNavLinks user={user} isMobile={false} />
                </ul>
            </div>
            
            <div className="navbar-end flex items-center gap-3">
                {/* Theme Toggle - Desktop */}
                <div className='shrink-0 lg:block hidden'>
                    <ThemeToggle isChecked={isChecked} handleThemeChange={handleThemeChange} />
                </div>
                
                <NavbarUserMenu 
                    user={user} 
                    handleSignOut={handleSignOut} 
                    getDashboardPath={getDashboardPath} 
                />
            </div>
        </div>
    );
};

export default Navbar;