const MyRequestPagination = ({
    currentPage,
    numberOfPages,
    totalRequests,
    handlePrevPage,
    handleNextPage,
    setCurrentPage
}) => {
    if (numberOfPages <= 1) return null;

    const pages = [...Array(numberOfPages).keys()].map(num => num + 1);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <div className="text-sm text-base-content/70 order-2 sm:order-1">
                Showing page {currentPage} of {numberOfPages} ({totalRequests} total requests)
            </div>
            <div className="flex gap-2 order-1 sm:order-2">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="btn btn-sm bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Prev
                </button>
                <div className="flex gap-1">
                    {pages.map(pg => (
                        <button
                            key={pg}
                            className={`btn btn-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-0 ${
                                pg === currentPage
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                                    : 'bg-base-200 text-base-content hover:bg-base-300'
                            }`}
                            onClick={() => setCurrentPage(pg)}
                        >
                            {pg}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === numberOfPages}
                    className="btn btn-sm bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyRequestPagination;
