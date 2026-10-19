import { Button } from '../../Components/UI';

const UserDesktopTable = ({
    users,
    currentPage,
    page,
    role,
    handleStatusChange,
    onEditRole
}) => {
    return (
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-base-200 border-2 border-base-300 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-base-300">
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content w-16">#</th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Name</th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Role</th>
                        <th className="border-2 border-base-300 px-4 py-3 text-left font-bold text-base-content">Status</th>
                        {(role === 'admin' || role === 'demoadmin') && (
                            <>
                                <th className="border-2 border-base-300 px-4 py-3 text-center font-bold text-base-content">Actions</th>
                                <th className="border-2 border-base-300 px-4 py-3 text-center font-bold text-base-content">Role Management</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map((userItem, index) => (
                        <tr key={userItem._id} className="hover:bg-base-300/50">
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content">
                                {(currentPage - 1) * page + (index + 1)}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-10 w-10">
                                            <img
                                                src={userItem?.imageUrl || 'https://i.ibb.co/MgsTCcv/avater.jpg'}
                                                alt={userItem?.name || 'User'}
                                                onError={(e) => { e.target.src = 'https://i.ibb.co/MgsTCcv/avater.jpg'; }}
                                            />
                                        </div>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold text-base-content truncate">{userItem?.name}</div>
                                        <div className="text-sm text-base-content/60 truncate">{userItem?.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content capitalize">
                                {userItem?.role}
                            </td>
                            <td className="border-2 border-base-300 px-4 py-3 font-semibold text-base-content capitalize">
                                {userItem?.status}
                            </td>
                            {(role === 'admin' || role === 'demoadmin') && (
                                <td className="border-2 border-base-300 px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {userItem?.status !== 'active' ? (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleStatusChange(userItem?.email, 'active')}
                                            >
                                                Active
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleStatusChange(userItem?.email, 'blocked')}
                                            >
                                                Block
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            )}
                            {(role === 'admin' || role === 'demoadmin') && (
                                <td className="border-2 border-base-300 px-4 py-3 text-center">
                                    <div className="flex items-center justify-center">
                                        <Button
                                            variant="accent"
                                            size="sm"
                                            onClick={() => onEditRole(userItem)}
                                        >
                                            Edit Role
                                        </Button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDesktopTable;
