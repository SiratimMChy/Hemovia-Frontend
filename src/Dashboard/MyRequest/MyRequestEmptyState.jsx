import { Link } from 'react-router';
import { Droplet } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';

const MyRequestEmptyState = ({ statusFilter }) => {
    return (
        <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplet className="w-8 h-8 sm:w-10 sm:h-10 text-base-content/40" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-2">No Requests Found</h3>
            <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                {statusFilter === 'all'
                    ? "You haven't created any donation requests yet."
                    : `No requests found with status: ${statusFilter}`
                }
            </p>
            <Link
                to="/dashboard/addRequest"
                className="btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
                <FaPlus className="w-4 h-4 mr-2" />
                Create Your First Request
            </Link>
        </div>
    );
};

export default MyRequestEmptyState;
