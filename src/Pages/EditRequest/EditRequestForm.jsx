const EditRequestForm = ({
    requestData,
    district,
    setDistrict,
    upazila,
    setUpazila,
    districts,
    filteredUpazilas,
    handleUpdateRequest,
    onCancel
}) => {
    return (
        <form onSubmit={handleUpdateRequest} className="space-y-4 sm:space-y-5">
            {/* Requester Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Requester Name</label>
                    <input
                        name='requesterName'
                        type="text"
                        readOnly
                        defaultValue={requestData.requesterName}
                        className="w-full rounded-lg border border-base-300 bg-base-100 px-3 sm:px-4 py-2 text-base-content/70 cursor-not-allowed text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Requester Email</label>
                    <input
                        name='requesterEmail'
                        type="email"
                        readOnly
                        defaultValue={requestData.requesterEmail}
                        className="w-full rounded-lg border border-base-300 bg-base-100 px-3 sm:px-4 py-2 text-base-content/70 cursor-not-allowed text-sm"
                    />
                </div>
            </div>
            {/* Recipient Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient Name</label>
                    <input
                        required
                        name='recipientName'
                        type="text"
                        defaultValue={requestData.recipientName}
                        placeholder="Enter recipient name"
                        className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient Mobile No</label>
                    <input
                        required
                        name='mobile'
                        type="text"
                        defaultValue={requestData.mobile}
                        placeholder="Enter recipient Mobile No"
                        className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient District</label>
                    <select
                        required
                        name='recipientDistrict'
                        value={district}
                        onChange={(e) => {
                            setDistrict(e.target.value);
                            setUpazila('');
                        }}
                        className="select w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                    >
                        <option value="">Select district</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient Upazila</label>
                    <select
                        required
                        name='recipientUpazila'
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        disabled={!district}
                        className="select w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <option value="">{district ? 'Select upazila' : 'Select district first'}</option>
                        {filteredUpazilas.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Hospital Info */}
            <div>
                <label className="block text-sm font-medium text-base-content mb-1">Hospital Name</label>
                <input
                    required
                    type="text"
                    name='hospitalName'
                    defaultValue={requestData.hospitalName}
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-base-content mb-1">Full Address</label>
                <input
                    name='fullAddress'
                    type="text"
                    defaultValue={requestData.fullAddress}
                    placeholder="e.g. Zahir Raihan Rd, Dhaka"
                    required
                    className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                />
            </div>

            {/* Blood Group */}
            <div>
                <label className="block text-sm font-medium text-base-content mb-1">Blood Group</label>
                <select
                    required
                    name='bloodGroup'
                    defaultValue={requestData.bloodGroup}
                    className="w-full select rounded-lg border border-base-300 bg-base-100 px-3 text-red-600 dark:text-red-400 font-bold sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                >
                    <option disabled value="">Choose Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Donation Date</label>
                    <input
                        required
                        name='donationDate'
                        type="date"
                        defaultValue={requestData.donationDate}
                        className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Donation Time</label>
                    <input
                        name='donationTime'
                        type="time"
                        defaultValue={requestData.donationTime}
                        className="input w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>
            </div>

            {/* Request Message */}
            <div>
                <label className="block text-sm font-medium text-base-content mb-1">Request Message</label>
                <textarea
                    rows="3"
                    name='requestMessage'
                    defaultValue={requestData.requestMessage}
                    placeholder="Write details about why blood is needed..."
                    className="textarea w-full rounded-lg border border-base-300 bg-base-100 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full rounded-lg bg-red-500 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base hover:bg-red-600 transition duration-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-red-600 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base hover:bg-red-700 transition duration-200"
                >
                    Update Request
                </button>
            </div>
        </form>
    );
};

export default EditRequestForm;
