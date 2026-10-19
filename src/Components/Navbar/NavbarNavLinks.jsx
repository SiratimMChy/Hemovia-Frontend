import { NavLink } from 'react-router';

const NavbarNavLinks = ({ user, isMobile = false }) => {
    const navLinkClass = ({ isActive }) =>
        "font-bold text-lg leading-none " +
        (isActive
            ? "bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
            : "text-base-content hover:text-red-500");

    if (isMobile) {
        return (
            <>
                <li>
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/donation-requests" className={navLinkClass}>
                        Donation Requests
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/center" className={navLinkClass}>
                        Donation Centers
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={navLinkClass}>
                        About
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <NavLink to="/donate" className={navLinkClass}>
                            Donate Now
                        </NavLink>
                    </li>
                )}
            </>
        );
    }

    return (
        <>
            <NavLink to="/" className={navLinkClass}>
                Home
            </NavLink>
            <NavLink to="/donation-requests" className={navLinkClass}>
                Donation Requests
            </NavLink>
            <NavLink to="/center" className={navLinkClass}>
                Donation Centers
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
                About
            </NavLink>
            {user && (
                <NavLink to="/donate" className={navLinkClass}>
                    Donate Now
                </NavLink>
            )}
        </>
    );
};

export default NavbarNavLinks;
