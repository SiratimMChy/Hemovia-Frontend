import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

// Demo accounts used for visitors to test the site
const DEMO_EMAILS = {
  DONOR: "donor@hemovia.com",
  ADMIN: "admin@hemovia.com"
};

// Check if the current user is logged in with a demo account
const isDemoUser = (userEmail) => {
  if (!userEmail) return false;
  return Object.values(DEMO_EMAILS).includes(userEmail);
};

// Check if this demo account is a donor or an admin
const getDemoUserType = (userEmail) => {
  if (!userEmail) return null;

  if (userEmail === DEMO_EMAILS.DONOR) return 'DONOR';
  if (userEmail === DEMO_EMAILS.ADMIN) return 'ADMIN';

  return null;
};

// Warning message shown when a demo user tries to edit or delete data
const getDemoRestrictionMessage = (userEmail) => {
  const demoType = getDemoUserType(userEmail);

  if (!demoType) return null;

  const messages = {
    DONOR: {
      title: "Demo User Restriction!",
      text: "You are a demo donor. To perform this action, you must register as a real user.",
      icon: "warning",
      confirmButtonText: "Understood"
    },
    ADMIN: {
      title: "Demo Admin Restriction!",
      text: "You are a demo admin. To perform this action, you must login as a real admin.",
      icon: "warning",
      confirmButtonText: "Understood"
    }
  };

  return messages[demoType];
};

// Helper hook to protect data from being edited by demo accounts
export const useDemoRestriction = () => {
  const { user } = useContext(AuthContext);

  const checkDemoRestriction = (callback = null) => {
    if (!user?.email) {
      if (callback) callback();
      return false;
    }

    if (isDemoUser(user.email)) {
      const message = getDemoRestrictionMessage(user.email);

      Swal.fire({
        title: message.title,
        text: message.text,
        icon: message.icon,
        confirmButtonText: message.confirmButtonText,
        confirmButtonColor: "#dc2626",
        customClass: {
          popup: 'swal2-popup-demo',
          title: 'swal2-title-demo',
          content: 'swal2-content-demo'
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      return true; // Stop demo user from making changes
    }

    if (callback) callback();
    return false; // Allow real user to continue
  };

  const isDemo = user?.email ? isDemoUser(user.email) : false;

  return {
    checkDemoRestriction,
    isDemo,
    userEmail: user?.email,
    isDemoUser,
    getDemoUserType
  };
};