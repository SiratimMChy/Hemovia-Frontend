import { MapPin, Phone, Mail, Calendar, Clock, Star } from 'lucide-react';

const CenterSidebar = ({ center }) => {
  return (
    <div className="space-y-6">
      {/* Contact Info */}
      <div className="bg-base-100 border-2 border-base-300 rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-lg font-bold text-base-content mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="text-base-content/40 shrink-0 mt-1" size={18} />
            <div>
              <p className="font-semibold text-base-content">Address</p>
              <p className="text-base-content/60">{center.address}</p>
            </div>
          </div>
          {center.phone && (
            <div className="flex items-start gap-3">
              <Phone className="text-base-content/40 shrink-0 mt-1" size={18} />
              <div>
                <p className="font-semibold text-base-content">Phone</p>
                <a href={`tel:${center.phone}`} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                  {center.phone}
                </a>
              </div>
            </div>
          )}
          {center.email && (
            <div className="flex items-start gap-3">
              <Mail className="text-base-content/40 shrink-0 mt-1" size={18} />
              <div>
                <p className="font-semibold text-base-content">Email</p>
                <a href={`mailto:${center.email}`} className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                  {center.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-base-100 border-2 border-base-300 rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-lg font-bold text-base-content mb-4">Operating Hours</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="text-base-content/40" size={18} />
            <div>
              <p className="font-semibold text-base-content">Open Days</p>
              <p className="text-base-content/60">{center.openDays || 'Please contact for schedule'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-base-content/40" size={18} />
            <div>
              <p className="font-semibold text-base-content">Hours</p>
              <p className="text-base-content/60">{center.openHours || 'Please contact for hours'}</p>
            </div>
          </div>
          {center.emergency && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-3">
              <p className="text-blue-800 dark:text-blue-400 font-semibold text-sm">{center.emergency}</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-base-100 border-2 border-base-300 rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-lg font-bold text-base-content mb-4">Quick Stats</h3>
        <div className="space-y-4">
          {center.established && (
            <div className="flex justify-between items-center">
              <span className="text-base-content/60">Established</span>
              <span className="font-semibold text-base-content">{center.established}</span>
            </div>
          )}
          {center.totalDonors && (
            <div className="flex justify-between items-center">
              <span className="text-base-content/60">Total Donors</span>
              <span className="font-semibold text-base-content">{center.totalDonors}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-base-content/60">Rating</span>
            <div className="flex items-center gap-1">
              <Star className="text-red-500 fill-red-500" size={16} />
              <span className="font-semibold text-base-content">{center.rating}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base-content/60">Reviews</span>
            <span className="font-semibold text-base-content">{center.reviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterSidebar;
