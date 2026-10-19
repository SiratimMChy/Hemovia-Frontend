const RequestPagination = ({
    currentPage,
    numberOfPages,
    onPrevPage,
    onNextPage,
    onSetPage
}) => {
    if (numberOfPages <= 1) return null;

    const pages = [...Array(numberOfPages).keys()].map(num => num + 1);

    return (
        <div className="flex justify-center items-center mt-8 gap-2 sm:gap-4">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm"
            >
                Prev
            </button>

            {/* Mobile: Compact page indicator */}
            <div className="md:hidden flex items-center gap-2 px-3">
                <span className="text-sm font-semibold text-base-content">
                    {currentPage} / {numberOfPages}
                </span>
            </div>

            {/* Desktop: Page numbers with smart truncation */}
            <div className="hidden md:flex gap-2">
                {pages.map(pg => {
                    const showPage =
                        pg === 1 ||
                        pg === pages.length ||
                        (pg >= currentPage - 1 && pg <= currentPage + 1);
                    const showEllipsisBefore = pg === currentPage - 2 && currentPage > 3;
                    const showEllipsisAfter = pg === currentPage + 2 && currentPage < pages.length - 2;

                    if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                            <span key={pg} className="px-2 py-2 text-base-content">
                                ...
                            </span>
                        );
                    }

                    if (!showPage) return null;

                    return (
                        <button
                            key={pg}
                            className={`btn rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-0 ${
                                pg === currentPage
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                                    : 'bg-base-200 text-base-content hover:bg-base-300'
                            }`}
                            onClick={() => onSetPage(pg)}
                        >
                            {pg}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={onNextPage}
                disabled={currentPage === numberOfPages}
                className="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm"
            >
                Next
            </button>
        </div>
    );
};

export default RequestPagination;
