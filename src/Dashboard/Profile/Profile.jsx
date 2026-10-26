import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import { useDemoRestriction } from "../../Hooks/useDemoRestriction";
import ProfileHeader from "./ProfileHeader";
import ProfileFormFields from "./ProfileFormFields";

const Profile = () => {
    const { setUser, user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { checkDemoRestriction } = useDemoRestriction();
    const axiosSecure = useAxiosSecure();

    // Fetch user profile data from database
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setProfileData(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching profile:", error);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure]);

    const handleEdit = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsEditing(true);
    };

    const handleCancel = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsEditing(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!isEditing) return;
        
        // Don't let demo users change profile info
        if (checkDemoRestriction()) return;

        setUploading(true);
        const form = e.target;
        const name = form.name.value;
        const photoUrlInput = form.photoUrl;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;

        try {
            let imageUrl = user?.photoURL || profileData?.imageUrl;

            // Upload new profile photo if selected
            if (photoUrlInput.files && photoUrlInput.files[0]) {
                const imageFile = photoUrlInput.files[0];
                const formData = new FormData();
                formData.append('image', imageFile);

                // Upload photo to image ImgBB
                const imgResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    formData
                );
                imageUrl = imgResponse.data.data.display_url;
            }

            // Update name and photo in Firebase
            await updateProfile(auth.currentUser, { displayName: name, photoURL: imageUrl });

            // Save updated profile info in database
            const updatedData = { name, imageUrl, district, upazila, bloodGroup };
            await axiosSecure.patch('/users/update/profile', updatedData);

            // Update local user state immediately
            setUser({ ...user, displayName: name, photoURL: imageUrl });
            setProfileData({ ...profileData, ...updatedData });

            setIsEditing(false);
            toast.success("Profile updated successfully!");

        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] py-12">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-1 sm:py-4 md:py-6 px-0 sm:px-2 md:px-0 min-w-0">
            {/* Page title and description */}
            <div className="text-center mb-4 sm:mb-8">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-base-content mb-1 sm:mb-2">
                    My Profile
                </h1>
                <p className="text-base-content/70 text-xs sm:text-sm md:text-base">
                    Manage your account information and preferences
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-base-200 border border-base-300 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg p-3 sm:p-5 md:p-8 min-w-0 w-full">
                {/* Profile Header */}
                <ProfileHeader user={user} profileData={profileData} />

                {/* Profile Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isEditing) handleUpdate(e);
                    }}
                    className="space-y-3.5 sm:space-y-6 w-full min-w-0"
                >
                    <ProfileFormFields
                        user={user}
                        profileData={profileData}
                        isEditing={isEditing}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-2.5 sm:gap-4 pt-3 sm:pt-6 w-full min-w-0">
                        {!isEditing ? (
                            <button
                                key="btn-edit"
                                type="button"
                                onClick={handleEdit}
                                className="btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] h-10 sm:h-12 min-h-[2.5rem] sm:min-h-[3rem] py-2 sm:py-3 px-5 sm:px-8 text-sm sm:text-base font-bold"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    key="btn-save"
                                    type="submit"
                                    disabled={uploading}
                                    className="btn bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-0 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto sm:min-w-[160px] h-10 sm:h-12 min-h-[2.5rem] sm:min-h-[3rem] py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-bold"
                                >
                                    {uploading ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                                <button
                                    key="btn-cancel"
                                    type="button"
                                    onClick={handleCancel}
                                    className="btn bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white border-0 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto sm:min-w-[140px] h-10 sm:h-12 min-h-[2.5rem] sm:min-h-[3rem] py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-bold"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
