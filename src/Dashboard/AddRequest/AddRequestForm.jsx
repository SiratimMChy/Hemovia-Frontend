const AddRequestForm = ({
    user,
    district,
    setDistrict,
    upazila,
    setUpazila,
    districts,
    filteredUpazilas,
    onSubmit
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            {/* Requester Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Requester Name</label>
                    <input
                        name="requesterName"
                        type="text"
                        readOnly
                        value={user?.displayName || ''}
                        className="w-full rounded-lg border-2 border-base-300 bg-base-300 px-3 sm:px-4 py-2 text-base-content cursor-not-allowed text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Requester Email</label>
                    <input
                        name="requesterEmail"
                        type="email"
                        readOnly
                        value={user?.email || ''}
                        className="w-full rounded-lg border-2 border-base-300 bg-base-300 px-3 sm:px-4 py-2 text-base-content cursor-not-allowed text-sm"
                    />
                </div>
            </div>

            {/* Recipient Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient Name</label>
                    <input
                        required
                        name="recipientName"
                        type="text"
                        placeholder="Enter recipient name"
                        className="input w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient Mobile No</label>
                    <input
                        required
                        name="mobile"
                        type="text"
                        placeholder="Enter recipient mobile number"
                        className="input w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient District</label>
                    <select
                        required
                        name="recipientDistrict"
                        value={district}
                        onChange={(e) => {
                            setDistrict(e.target.value);
                            setUpazila('');
                        }}
                        className="select w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                    >
                        <option value="">Select district</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Recipient Upazila</label>
                    <select
                        required
                        name="recipientUpazila"
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        disabled={!district}
                        className="select w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <option value="">{district ? 'Select upazila' : 'Select district first'}</option>
                        {filteredUpazilas.map(u => (
                            <option key={u.id} value={u.name}>
                                {u.name}
                            </option>
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
                    name="hospitalName"
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className="input w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-base-content mb-1">Full Address</label>
                <input
                    name="fullAddress"
                    type="text"
                    placeholder="e.g. Zahir Raihan Rd, Dhaka"
                    required
                    className="input w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                />
            </div>

            {/* Blood Group */}
            <div>
                <label className="block text-sm font-medium text-base-content mb-1">Blood Group</label>
                <select required name="bloodGroup" className="w-full select rounded-lg border-2 border-base-300 bg-base-200 text-red-600 dark:text-red-400 font-bold px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm">
                    <option disabled value="">Choose Blood Group</option>
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

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Donation Date</label>
                    <input
                        required
                        name="donationDate"
                        type="date"
                        className="input w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-base-content mb-1">Donation Time</label>
                    <input
                        name="donationTime"
                        type="time"
                        className="input w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                    />
                </div>
            </div>

            {/* Request Message */}
            <div>
                <label className="block text-sm font-medium text-base-content mb-1">Request Message</label>
                <textarea
                    rows="3"
                    name="requestMessage"
                    placeholder="Write details about why blood is needed..."
                    className="textarea w-full rounded-lg border-2 border-base-300 bg-base-200 text-base-content px-3 sm:px-4 py-2 focus:ring-2 focus:ring-red-500 text-sm"
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
                <button
                    type="submit"
                    className="w-full rounded-lg bg-red-600 py-2.5 sm:py-3 text-white font-semibold text-sm sm:text-base hover:bg-red-700 transition duration-200"
                >
                    Request Blood Donation
                </button>
            </div>
        </form>
    );
};

export default AddRequestForm;
