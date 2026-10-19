import { 
  Home, 
  Users, 
  FileText, 
  User, 
  Plus, 
  Heart, 
  Activity 
} from 'lucide-react';
import { VscRequestChanges } from 'react-icons/vsc';

export const getDashboardTitle = (role) => {
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

export const getNavLinks = (role) => {
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
