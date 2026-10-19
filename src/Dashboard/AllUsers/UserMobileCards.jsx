import { Button } from '../../Components/UI';

const UserMobileCards = ({
    users,
    currentPage,
    page,
    role,
    handleStatusChange,
    onEditRole
}) => {
    return (
        <div className="md:hidden space-y-3.5">
            {users.map((userItem, index) => (
                <div key={userItem._id} className="bg-base-200 border-2 border-base-300 rounded-xl shadow-lg p-3.5 sm:p-4 space-y-3">
                    {/* Header: Avatar, Name, and Serial Badge */}
                    <div className="flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="avatar shrink-0">
                                <div className="mask mask-squircle h-9 w-9">
                                    <img
                                        src={userItem?.imageUrl || 'https://i.ibb.co/MgsTCcv/avater.jpg'}
                                        alt={userItem?.name || 'User'}
                                        onError={(e) => { e.target.src = 'https://i.ibb.co/MgsTCcv/avater.jpg'; }}
                                    />
                                </div>
                            </div>
                            <div className="font-bold text-sm sm:text-base text-base-content break-words leading-tight min-w-0">
                                {userItem?.name}
                            </div>
                        </div>
                        <span className="badge badge-sm badge-ghost font-bold text-xs shrink-0">
                            #{(currentPage - 1) * page + (index + 1)}
                        </span>
                    </div>

                    {/* Details Box: Full-width Email + Role & Status Grid */}
                    <div className="p-2.5 rounded-lg bg-base-100/60 border border-base-300/60 space-y-2">
                        {/* Email row with full card width */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5 text-xs min-w-0">
                            <span className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider shrink-0">Email:</span>
                            <span className="font-medium text-base-content break-all select-all text-xs">
                                {userItem?.email}
                            </span>
                        </div>

                        {/* Role & Status Grid */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-base-300/50">
                            <div>
                                <span className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider block mb-0.5">Role</span>
                                <span className="font-bold text-xs sm:text-sm text-base-content capitalize">{userItem?.role}</span>
                            </div>
                            <div>
                                <span className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider block mb-0.5">Status</span>
                                <span className="font-bold text-xs sm:text-sm text-base-content capitalize">{userItem?.status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {(role === 'admin' || role === 'demoadmin') && (
                        <div className="flex gap-2 pt-1">
                            {userItem?.status !== 'active' ? (
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => handleStatusChange(userItem?.email, 'active')}
                                    className="flex-1"
                                >
                                    Active
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleStatusChange(userItem?.email, 'blocked')}
                                    className="flex-1"
                                >
                                    Block
                                </Button>
                            )}
                            <Button
                                variant="accent"
                                size="sm"
                                onClick={() => onEditRole(userItem)}
                                className="flex-1"
                            >
                                Edit Role
                            </Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserMobileCards;
