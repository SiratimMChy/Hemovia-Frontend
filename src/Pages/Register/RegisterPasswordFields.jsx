import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPasswordFields = ({
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                    <FaLock className="inline mr-2 text-base-content/60" /> Password
                </label>
                <div className="relative">
                    <input 
                        id="password"
                        name='password' 
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300 pr-12" 
                        placeholder="Enter password" 
                        required 
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                    <FaLock className="inline mr-2 text-base-content/60" /> Confirm Password
                </label>
                <div className="relative">
                    <input 
                        id="confirmPassword"
                        name="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="w-full px-4 py-3 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-red-500 focus:outline-none transition-all duration-300 pr-12" 
                        placeholder="Confirm password" 
                        required 
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPasswordFields;
