import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const getStatusIcon = (status) => {
    switch (status) {
        case 'pending':
            return <AlertCircle className="w-4 h-4" />;
        case 'inprogress':
            return <Clock className="w-4 h-4" />;
        case 'done':
            return <CheckCircle className="w-4 h-4" />;
        case 'canceled':
            return <XCircle className="w-4 h-4" />;
        default:
            return <AlertCircle className="w-4 h-4" />;
    }
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50';
        case 'inprogress':
            return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-900/50';
        case 'done':
            return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/50';
        case 'canceled':
            return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-900/50';
        default:
            return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-900/50';
    }
};
