import { Link } from 'react-router';
import { MdBloodtype } from 'react-icons/md';
import { mainLinks, donationLinks, socialLinks } from './footerLinks';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-14">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MdBloodtype className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-extrabold">Hemovia</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Connecting donors with those in need. Every donation saves lives and brings hope to families in critical need.
                        </p>
                    </div>

                    <div>
                        <h6 className="font-bold text-lg mb-5 text-white">Quick Links</h6>
                        <ul className="space-y-3">
                            {mainLinks.map((item) => (
                                <li key={item.to}>
                                    <Link to={item.to} className="text-gray-400 hover:text-red-500 transition">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-bold text-lg mb-5 text-white">Donation</h6>
                        <ul className="space-y-3">
                            {donationLinks.map((item) => (
                                <li key={item.to}>
                                    <Link to={item.to} className="text-gray-400 hover:text-red-500 transition">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-bold text-lg mb-5 text-white">Follow Us</h6>
                        <p className="text-gray-400 text-sm mb-4">
                            Stay connected with our blood donor community.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-200" aria-label={`Follow us on ${label}`}>
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-center sm:text-left text-sm">
                        © {new Date().getFullYear()} Hemovia. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                        <Link to="/privacy-policy" className="hover:text-red-500 transition">Privacy Policy</Link>
                        <span className="text-gray-600">·</span>
                        <Link to="/terms-of-service" className="hover:text-red-500 transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
