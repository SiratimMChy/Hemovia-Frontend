import { Link } from 'react-router';
import { MapPin, Phone, Star, Building, ChevronLeft, CheckCircle, Mail } from 'lucide-react';

const CenterHeader = ({ center }) => {
  return (
    <div className="bg-base-100 border-b border-base-300">
      <div className="container mx-auto px-4 py-6">
        <Link 
          to="/center" 
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold mb-4 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Centers
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center shrink-0">
                <Building className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">{center.name}</h1>
                <div className="flex items-center gap-4 text-base-content/60">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{center.district}, {center.division}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-red-500 fill-red-500" />
                    <span className="font-semibold">{center.rating}</span>
                    <span>({center.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {center.verified && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  <CheckCircle size={14} />
                  Verified
                </span>
              )}
              {center.featured && (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  <Star size={14} />
                  Featured
                </span>
              )}
              {center.emergency && center.emergency.includes('24/7') && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  24/7 Emergency
                </span>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-64">
            {center.phone && (
              <a 
                href={`tel:${center.phone}`}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Call Now
              </a>
            )}
            {center.email && (
              <a 
                href={`mailto:${center.email}`}
                className="bg-base-300 hover:bg-base-400 text-base-content px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Email
              </a>
            )}
            {!center.phone && !center.email && (
              <div className="bg-base-200 text-base-content/60 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <Phone size={18} />
                Contact info coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterHeader;
