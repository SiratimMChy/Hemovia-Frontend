import { Link } from 'react-router';
import { FaUser, FaEnvelope, FaImage, FaTint, FaMapMarkerAlt } from 'react-icons/fa';
import PasswordRequirements from './PasswordRequirements';
import RegisterPasswordFields from './RegisterPasswordFields';

const RegisterForm = ({
    handleSubmit,
    district,
    setDistrict,
    upazila,
    setUpazila,
    districts,
    filteredUpazilas,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
}) => {
    return (
        <form onSubmit={handleSubmit} className="bg-base-100 border-2 border-base-300 rounded-xl shadow-lg p-6 md:p-8">
            <fieldset className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-base-content mb-2">
                        <FaUser className="inline mr-2 text-base-content/60" /> Full Name
                    </label>
                    <input 
                        id="name"
                        name='name' 
                        type="text" 
                        autoComplete="name"
                        className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300" 
                        placeholder="Enter your full name" 
                        required 
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-base-content mb-2">
                        <FaEnvelope className="inline mr-2 text-base-content/60" /> Email Address
                    </label>
                    <input 
                        id="email"
                        name='email' 
                        type="email" 
                        autoComplete="email"
                        className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300" 
                        placeholder="Enter your email address" 
                        required 
                    />
                </div>

                {/* Photo and Blood Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            <FaImage className="inline mr-2 text-base-content/60" /> Profile Photo
                        </label>
                        <input 
                            id="photoUrl"
                            name="photoUrl" 
                            type="file" 
                            className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 transition-all duration-300" 
                            accept="image/*" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            <FaTint className="inline mr-2 text-red-500" /> Blood Group
                        </label>
                        <select
                            id="bloodGroup"
                            name="bloodGroup"
                            defaultValue=""
                            className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300"
                            required
                        >
                            <option disabled value="">Choose Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* District and Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            <FaMapMarkerAlt className="inline mr-2 text-base-content/60" /> District
                        </label>
                        <select 
                            id="district"
                            value={district} 
                            onChange={(e) => {
                                setDistrict(e.target.value);
                                setUpazila('');
                            }} 
                            className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300"
                            required
                        >
                            <option disabled value="">Choose District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.name}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">
                            <FaMapMarkerAlt className="inline mr-2 text-base-content/60" /> Upazila
                        </label>
                        <select 
                            id="upazila"
                            value={upazila} 
                            onChange={(e) => setUpazila(e.target.value)} 
                            disabled={!district}
                            className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            required
                        >
                            <option disabled value="">{district ? 'Choose Upazila' : 'Select district first'}</option>
                            {filteredUpazilas.map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Password and Confirm Password */}
                <RegisterPasswordFields
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                />

                {/* Password Requirements */}
                <PasswordRequirements />
            </fieldset>

            {/* Register Button */}
            <button 
                type="submit" 
                className="btn w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold border-0 shadow-lg hover:shadow-xl transition-all duration-200 mt-6 rounded-xl py-3 min-h-12"
            >
                Create Account
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-base-300">
                <p className="text-base-content/60">
                    Already have an account?{' '}
                    <Link 
                        className='text-red-600 hover:text-red-700 font-bold hover:font-bold transition-colors' 
                        to="/login"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;
