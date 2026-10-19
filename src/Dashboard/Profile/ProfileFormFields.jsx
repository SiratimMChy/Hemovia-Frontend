const ProfileFormFields = ({ user, profileData, isEditing }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 md:gap-6 w-full min-w-0">
            {/* Name Field */}
            <div className="w-full min-w-0">
                <label className="label py-1 sm:py-1.5">
                    <span className="label-text text-xs sm:text-sm text-base-content font-semibold">Full Name</span>
                </label>
                <input
                    defaultValue={user?.displayName || profileData?.name}
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`input input-bordered w-full min-w-0 h-10 sm:h-12 text-xs sm:text-sm md:text-base px-3 sm:px-4 rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                    disabled={!isEditing}
                    required
                />
            </div>

            {/* Email Field */}
            <div className="w-full min-w-0">
                <label className="label py-1 sm:py-1.5">
                    <span className="label-text text-xs sm:text-sm text-base-content font-semibold">Email Address</span>
                </label>
                <input
                    defaultValue={user?.email}
                    type="email"
                    className="input input-bordered w-full min-w-0 h-10 sm:h-12 text-xs sm:text-sm md:text-base px-3 sm:px-4 rounded-lg bg-base-300 text-base-content border-base-300 cursor-not-allowed"
                    disabled
                />
            </div>

            {/* Blood Group Field */}
            <div className="w-full min-w-0">
                <label className="label py-1 sm:py-1.5">
                    <span className="label-text text-xs sm:text-sm text-base-content font-semibold">Blood Group</span>
                </label>
                <select
                    name="bloodGroup"
                    defaultValue={profileData?.bloodGroup}
                    className={`select select-bordered w-full min-w-0 h-10 sm:h-12 text-xs sm:text-sm md:text-base px-3 sm:px-4 rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                    disabled={!isEditing}
                    required
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>

            {/* District Field */}
            <div className="w-full min-w-0">
                <label className="label py-1 sm:py-1.5">
                    <span className="label-text text-xs sm:text-sm text-base-content font-semibold">District</span>
                </label>
                <input
                    defaultValue={profileData?.district}
                    name="district"
                    type="text"
                    placeholder="Enter your district"
                    className={`input input-bordered w-full min-w-0 h-10 sm:h-12 text-xs sm:text-sm md:text-base px-3 sm:px-4 rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                    disabled={!isEditing}
                    required
                />
            </div>

            {/* Upazila Field */}
            <div className="w-full min-w-0">
                <label className="label py-1 sm:py-1.5">
                    <span className="label-text text-xs sm:text-sm text-base-content font-semibold">Upazila</span>
                </label>
                <input
                    defaultValue={profileData?.upazila}
                    name="upazila"
                    type="text"
                    placeholder="Enter your upazila"
                    className={`input input-bordered w-full min-w-0 h-10 sm:h-12 text-xs sm:text-sm md:text-base px-3 sm:px-4 rounded-lg bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                    disabled={!isEditing}
                    required
                />
            </div>

            {/* Photo Upload Field */}
            <div className="w-full min-w-0">
                <label className="label py-1 sm:py-1.5">
                    <span className="label-text text-xs sm:text-sm text-base-content font-semibold">Profile Photo</span>
                </label>
                <input
                    name="photoUrl"
                    type="file"
                    accept="image/*"
                    className={`file-input file-input-bordered file-input-sm sm:file-input-md w-full min-w-0 max-w-full rounded-lg text-xs sm:text-sm bg-base-100 text-base-content border-base-300 ${isEditing ? 'focus:ring-2 focus:ring-red-500 focus:border-transparent' : 'bg-base-300 cursor-not-allowed'}`}
                    disabled={!isEditing}
                />
            </div>
        </div>
    );
};

export default ProfileFormFields;
