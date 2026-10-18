import { useContext, useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Plus, 
  Heart, 
  Activity, 
  Sun, 
  Moon
} from 'lucide-react';
import { NavLink, useNavigate, Link } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { MdBloodtype } from 'react-icons/md';
import { VscRequestChanges } from 'react-icons/vsc';

const Aside = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Auto-collapse on small screens (< 768px)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });
  
  // Theme state management
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const handleThemeToggle = () => {
    setIsDark(prev => {
      const newState = !prev;
      const theme = newState ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { theme } 
      }));
      
      return newState;
    });
  };

  // Listen for theme changes from other components
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    const handleThemeChange = (e) => {
      setIsDark(e.detail.theme === 'dark');
    };

    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setIsDark(e.newValue === 'dark');
        document.documentElement.setAttribute("data-theme", e.newValue);
      }
    };

    window.addEventListener('themeChange', handleThemeChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Listen for window resize to collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDashboardTitle = () => {
    switch (role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'donor':
        return 'Donor Dashboard';
      case 'volunteer':
        return 'Volunteer Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const getNavLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { to: '/dashboard/admindashboard', icon: Activity, label: 'Dashboard' },
          { to: '/dashboard/profile', icon: User, label: 'Profile' },
          { to: '/dashboard/all-users', icon: Users, label: 'All Users' },
          { to: '/dashboard/allRequest', icon: VscRequestChanges, label: 'All Requests' },
        ];
      case 'volunteer':
        return [
          { to: '/dashboard/volunteerdashboard', icon: Heart, label: 'Dashboard' },
          { to: '/dashboard/profile', icon: User, label: 'Profile' },
          { to: '/dashboard/all-users', icon: Users, label: 'All Users' },
          { to: '/dashboard/allRequest', icon: VscRequestChanges, label: 'All Requests' },
        ];
      case 'donor':
        return [
          { to: '/dashboard/donordashboard', icon: Home, label: 'Dashboard' },
          { to: '/dashboard/profile', icon: User, label: 'Profile' },
          { to: '/dashboard/addRequest', icon: Plus, label: 'Add Requests' },
          { to: '/dashboard/myRequest', icon: FileText, label: 'My Requests' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();
  const activeClass = 'bg-red-500 hover:bg-red-600 text-white shadow-md';
  const inactiveClass = 'text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600';

  const handleNavClick = () => {
    // If on mobile screen, auto-collapse after clicking a navigation link
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay when expanded */}
      {!isCollapsed && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Unified Single Aside Sidebar */}
      <aside
        className={`min-h-screen bg-base-200 border-r-2 border-base-300 flex flex-col shadow-lg transition-all duration-300 shrink-0 ${
          isCollapsed
            ? 'w-16 sticky top-0 z-30'
            : 'w-64 max-w-[85vw] fixed md:sticky top-0 left-0 h-screen z-50 shadow-2xl md:shadow-lg'
        }`}
      >
        {/* Single Circular Toggle Button on the border edge beside the logo */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-7 w-7 h-7 bg-base-100 border-2 border-base-300 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 text-base-content/70 transition-all duration-200 z-50 cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Brand Header */}
        <div className="px-4 py-6 border-b-2 border-base-300 bg-base-100 shrink-0">
          <Link
            to="/"
            onClick={handleNavClick}
            className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}
            title="Go to Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
              <MdBloodtype className="text-white" size={18} />
            </div>
            {!isCollapsed && (
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-base-content truncate">
                {getDashboardTitle()}
              </h1>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-1.5 px-2.5 py-6 overflow-y-auto">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? activeClass : inactiveClass
                } ${isCollapsed ? 'justify-center' : ''}`
              }
              title={isCollapsed ? label : ''}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer / Theme Toggle & Home */}
        <div className="p-3 border-t-2 border-base-300 bg-base-100 space-y-2 shrink-0">
          <button
            onClick={handleThemeToggle}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-base-content hover:bg-base-200 hover:text-red-600 border-2 border-base-300 hover:border-red-200 transition-all duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? (isDark ? 'Switch to Light' : 'Switch to Dark') : ''}
          >
            {isDark ? (
              <Sun size={17} className="shrink-0" />
            ) : (
              <Moon size={17} className="shrink-0" />
            )}
            {!isCollapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          <button
            onClick={() => {
              handleNavClick();
              navigate('/');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-base-content hover:bg-red-50 dark:hover:bg-base-300 hover:text-red-600 border-2 border-base-300 hover:border-red-200 transition-all duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Go to Home' : ''}
          >
            <Home size={17} className="shrink-0" />
            {!isCollapsed && <span>Go to Home</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;