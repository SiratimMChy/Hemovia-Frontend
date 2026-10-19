import { FaUser, FaUserShield } from 'react-icons/fa';
import { Card, Button } from '../../Components/UI';
import { TYPOGRAPHY } from '../../styles/designSystem';

const DemoLoginModal = ({
    isOpen,
    onClose,
    loadingDemo,
    demoUsers,
    onDemoLogin
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card variant="elevated" className="w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg mb-4">
                        <FaUser className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold text-base-content mb-2 ${TYPOGRAPHY.fontFamily}`}>
                        Choose Demo User
                    </h3>
                    <p className="text-base-content/60 text-sm">
                        Select a demo account to test the application
                    </p>
                </div>

                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {loadingDemo ? (
                        <div className="flex justify-center py-8">
                            <span className="loading loading-spinner loading-md text-red-600"></span>
                        </div>
                    ) : demoUsers.length > 0 ? (
                        demoUsers.map((demoUser) => (
                            <div
                                key={demoUser._id}
                                onClick={() => onDemoLogin(demoUser)}
                                className="p-3 border border-base-300 rounded-lg hover:border-red-500 hover:bg-base-200/50 cursor-pointer transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                                        {demoUser.role === 'admin' ? <FaUserShield /> : <FaUser />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-base-content">{demoUser.name}</p>
                                        <p className="text-sm text-base-content/60">{demoUser.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`badge badge-sm font-bold ${
                                        demoUser.role === 'admin' ? 'badge-error text-white' :
                                        demoUser.role === 'volunteer' ? 'badge-warning text-white' :
                                        'badge-info text-white'
                                    }`}>
                                        {demoUser.role}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-base-content/60">
                            <p>No demo users available</p>
                        </div>
                    )}
                </div>

                <Button
                    onClick={onClose}
                    variant="secondary"
                    className="w-full"
                >
                    Cancel
                </Button>
            </Card>
        </div>
    );
};

export default DemoLoginModal;
