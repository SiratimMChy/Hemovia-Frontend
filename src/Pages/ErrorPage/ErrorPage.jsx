import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Droplet } from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
            <Navbar />
            
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24">
                <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-1.5 rounded-full mb-4 shadow-sm">
                    <span className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
                        Error 404
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-base-content mb-3">
                    Page <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Not Found</span>
                </h1>

                <p className="text-sm sm:text-base text-base-content/70 max-w-md mx-auto mb-8 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline border-2 border-base-300 hover:border-red-500 hover:bg-base-200 text-base-content font-bold rounded-lg w-full sm:w-44 h-11 sm:h-12 flex items-center justify-center gap-2 transition-all"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="btn bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0 font-bold rounded-lg shadow-md hover:shadow-lg w-full sm:w-44 h-11 sm:h-12 flex items-center justify-center gap-2 transition-all"
                    >
                        <Home size={18} />
                        Back to Home
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ErrorPage;
