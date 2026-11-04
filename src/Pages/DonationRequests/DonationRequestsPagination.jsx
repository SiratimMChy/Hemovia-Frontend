import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DonationRequestsPagination = ({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    onPageSelect
}) => {
    if (totalPages <= 1) return null;

    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <div className="flex justify-center items-center mt-10 sm:mt-12 gap-2 sm:gap-2.5 flex-wrap">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="btn btn-sm sm:btn-md bg-base-200 hover:bg-base-300 text-base-content border border-base-300 rounded-lg shadow-sm hover:shadow disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer font-bold text-xs sm:text-sm"
            >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
            </button>

            {pages.map(pg => (
                <button
                    key={pg}
                    onClick={() => onPageSelect(pg)}
                    className={`btn btn-sm sm:btn-md rounded-lg shadow-sm transition-all border-0 cursor-pointer font-bold text-xs sm:text-sm ${
                        pg === currentPage
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                            : 'bg-base-200 text-base-content hover:bg-base-300 border border-base-300'
                    }`}
                >
                    {pg}
                </button>
            ))}

            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="btn btn-sm sm:btn-md bg-base-200 hover:bg-base-300 text-base-content border border-base-300 rounded-lg shadow-sm hover:shadow disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer font-bold text-xs sm:text-sm"
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default DonationRequestsPagination;

