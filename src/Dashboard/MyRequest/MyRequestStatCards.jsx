import { Card } from '../../Components/UI';
import { UserRoundPlus, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { LAYOUT, SPACING } from '../../styles/designSystem';

const MyRequestStatCards = ({ totalRequests, myRequests }) => {
    return (
        <div className={`${LAYOUT.grid.stats} ${SPACING.marginMd}`}>
            <Card className="text-center hover:border-red-200 dark:hover:border-red-900/50 transition-all">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <UserRoundPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-base-content">{totalRequests}</p>
                <p className="text-xs sm:text-sm text-base-content/70 font-semibold">Total Requests</p>
            </Card>
            <Card className="text-center hover:border-yellow-200 dark:hover:border-yellow-900/50 transition-all">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-base-content">
                    {myRequests.filter(r => r.donation_status === 'pending').length}
                </p>
                <p className="text-xs sm:text-sm text-base-content/70 font-semibold">Pending</p>
            </Card>
            <Card className="text-center hover:border-blue-200 dark:hover:border-blue-900/50 transition-all">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-base-content">
                    {myRequests.filter(r => r.donation_status === 'inprogress').length}
                </p>
                <p className="text-xs sm:text-sm text-base-content/70 font-semibold">In Progress</p>
            </Card>
            <Card className="text-center hover:border-green-200 dark:hover:border-green-900/50 transition-all">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-base-content">
                    {myRequests.filter(r => r.donation_status === 'done').length}
                </p>
                <p className="text-xs sm:text-sm text-base-content/70 font-semibold">Completed</p>
            </Card>
        </div>
    );
};

export default MyRequestStatCards;
