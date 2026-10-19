const PasswordRequirements = () => {
    return (
        <div className="bg-base-100 border border-base-300 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-base-content mb-2">Password Requirements:</h4>
            <ul className="text-xs text-base-content/70 space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Contains at least one uppercase letter</li>
                <li>• Contains at least one lowercase letter</li>
            </ul>
        </div>
    );
};

export default PasswordRequirements;
