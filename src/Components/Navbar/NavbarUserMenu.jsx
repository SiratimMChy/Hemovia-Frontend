import { Link } from 'react-router';

const NavbarUserMenu = ({ user, handleSignOut, getDashboardPath }) => {
    if (!user) {
        return (
            <Link 
                to="/login" 
                className="btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-none shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg font-bold px-6"
            >
                Login
            </Link>
        );
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-200">
                <div className="w-10 rounded-full ring-2 ring-red-500 ring-offset-base-100 ring-offset-2 hover:ring-4 transition-all duration-300">
                    <img
                        alt="User Avatar"
                        src={user?.photoURL || user?.imageUrl || "https://via.placeholder.com/150"}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || user?.name || 'User') + "&background=dc2626&color=fff&size=150";
                        }}
                    />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-72 p-4 shadow-xl border border-base-300 dark:border-base-content/10">
                <li className="menu-title px-0 py-2 mb-2">
                    <div className="flex flex-col gap-1 w-full">
                        <span className="text-base font-bold text-red-600 dark:text-red-400 truncate">{user?.displayName || user?.name || 'User'}</span>
                        <span className="text-xs text-base-content/70 wrap-break-word leading-relaxed">{user?.email}</span>
                    </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                    <Link to={getDashboardPath()} className="text-base-content hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors duration-200 py-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-semibold">Dashboard</span>
                    </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                    <button onClick={handleSignOut} className="text-base-content hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors duration-200 py-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-semibold">Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default NavbarUserMenu;
