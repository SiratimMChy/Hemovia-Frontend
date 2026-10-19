const ProfileHeader = ({ user, profileData }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-6 mb-5 sm:mb-8 min-w-0 w-full">
            <div className="avatar shrink-0">
                <div className="w-18 h-18 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                    <img 
                        src={user?.photoURL || profileData?.imageUrl || '/default-avatar.png'} 
                        alt="Profile"
                        className="rounded-full object-cover"
                    />
                </div>
            </div>
            <div className="text-center md:text-left min-w-0 max-w-full w-full flex-1 overflow-hidden">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-base-content truncate px-1 leading-tight">
                    {user?.displayName || profileData?.name || 'User'}
                </h2>
                <p className="text-base-content/70 text-xs sm:text-sm md:text-base truncate px-1 mt-0.5 sm:mt-1">
                    {user?.email}
                </p>
                <div className="badge badge-sm sm:badge-md md:badge-lg bg-red-600 text-white font-bold mt-1.5 sm:mt-2">
                    {profileData?.role?.toUpperCase() || 'USER'}
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
