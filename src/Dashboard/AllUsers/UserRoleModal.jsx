import { Button } from '../../Components/UI';

const UserRoleModal = ({
    selectedUser,
    onSubmit
}) => {
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box m-auto max-w-sm bg-base-100">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">✕</button>
                </form>
                {selectedUser && (
                    <form key={selectedUser._id} onSubmit={onSubmit}>
                        <h1 className='text-center font-bold text-xl mb-4 text-base-content'>User Details</h1>
                        <div className="flex flex-col mb-3">
                            <label className="label">
                                <span className="label-text text-base-content">Name</span>
                            </label>
                            <input
                                name='name'
                                readOnly
                                defaultValue={selectedUser?.name}
                                type="text"
                                className="input input-bordered bg-base-200 text-base-content border-base-300"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label className="label">
                                <span className="label-text text-base-content">Role</span>
                            </label>
                            <select
                                name="role"
                                defaultValue={selectedUser?.role}
                                className="select select-bordered bg-base-200 text-base-content border-base-300"
                                required
                            >
                                <option>admin</option>
                                <option>volunteer</option>
                                <option>donor</option>
                            </select>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label className="label">
                                <span className="label-text text-base-content">Email</span>
                            </label>
                            <input
                                name='email'
                                readOnly
                                defaultValue={selectedUser?.email}
                                type="email"
                                className="input input-bordered bg-base-200 text-base-content border-base-300"
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                variant="accent"
                                className="w-full"
                            >
                                Update Role
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </dialog>
    );
};

export default UserRoleModal;
