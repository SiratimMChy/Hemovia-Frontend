import { Heart, Activity, Phone, Mail, MapPin } from 'lucide-react';

const AboutCta = ({ stats }) => {
  return (
    <div className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-red-100 text-lg mb-8">
              Join {stats.totalDonors} heroes who are already saving lives in Sylhet and across Bangladesh. 
              With {stats.pendingRequests} people currently waiting for blood, your donation can make the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/signup"
                className="group inline-flex items-center justify-center gap-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                <span>Become a Donor</span>
              </a>
              <a
                href="/donation-requests"
                className="group inline-flex items-center justify-center gap-3 bg-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-900 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Activity size={20} className="group-hover:scale-110 transition-transform" />
                <span>Find Donors</span>
              </a>
            </div>
            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-red-500">
              <div className="flex items-center justify-center gap-3">
                <Phone size={20} className="text-red-200" />
                <span className="text-red-100">+880 1234-567890</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail size={20} className="text-red-200" />
                <span className="text-red-100">support@hemovia.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin size={20} className="text-red-200" />
                <span className="text-red-100">Sylhet, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCta;
