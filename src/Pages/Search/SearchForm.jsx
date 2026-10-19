import React from 'react';
import { FaSearch, FaTint, FaMapMarkerAlt } from 'react-icons/fa';

const SearchForm = ({
    handleSearch,
    isLoading,
    districts,
    district,
    setDistrict,
    upazila,
    setUpazila,
    filteredUpazilas
}) => {
    return (
        <div className="bg-base-200 rounded-2xl shadow-xl border border-base-300 p-6 md:p-8 mb-12">
            <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Blood Group */}
                    <div>
                        <label className="label">
                            <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                <FaTint className="text-red-500" /> Blood Group
                            </span>
                        </label>
                        <select
                            name="bloodGroup"
                            defaultValue=""
                            className="select select-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                        >
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

                    {/* District */}
                    <div>
                        <label className="label">
                            <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" /> District
                            </span>
                        </label>
                        <select
                            value={district}
                            onChange={(e) => {
                                setDistrict(e.target.value);
                                setUpazila('');
                            }}
                            className="select select-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                        >
                            <option value="">Choose District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div>
                        <label className="label">
                            <span className="label-text text-base-content font-semibold flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" /> Upazila
                            </span>
                        </label>
                        <select
                            value={upazila}
                            onChange={(e) => setUpazila(e.target.value)}
                            disabled={!district}
                            className="select select-bordered w-full bg-base-100 text-base-content border-base-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <option value="">{district ? 'Choose Upazila' : 'Select district first'}</option>
                            {filteredUpazilas.map(u => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 px-12 py-3 text-lg font-semibold flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Searching...
                            </>
                        ) : (
                            <>
                                <FaSearch /> Search Donors
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
