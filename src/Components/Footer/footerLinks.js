import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

export const mainLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Blood Compatibility', to: '/BloodCom' }
];

export const donationLinks = [
    { label: 'Donate Now', to: '/donate' },
    { label: 'Donation Requests', to: '/donation-requests' },
    { label: 'Search Donors', to: '/search' },
    { label: 'Blood Centers', to: '/center' }
];

export const socialLinks = [
    { Icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
    { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' }
];
