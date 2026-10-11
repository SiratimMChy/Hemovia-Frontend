import { Award, Users, Search, Droplet, Clock, Heart, Shield } from 'lucide-react';
import { Card } from '../UI';
import { TYPOGRAPHY } from '../../styles/designSystem';

const HowItWorks = () => {
  return (
    <div className="py-24 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4">
            <Award className="text-red-700 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-500 font-bold text-sm">WHY CHOOSE US</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
            How It Works
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Simple, fast, and secure way to connect donors with those in need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="group hover:border-red-200 dark:hover:border-red-900/50 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-red-200 dark:shadow-red-900/30">
              <Users className="text-white" size={24} />
            </div>
            <h3 className={`${TYPOGRAPHY.heading.h4} mb-2`}>Register as Donor</h3>
            <p className={`${TYPOGRAPHY.body.small} leading-relaxed`}>
              Quick and easy registration process. Sign up with your details, blood type, and location to join our life-saving community.
            </p>
          </Card>

          <Card className="group hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
              <Search className="text-white" size={24} />
            </div>
            <h3 className={`${TYPOGRAPHY.heading.h4} mb-2`}>Find Blood Donors</h3>
            <p className={`${TYPOGRAPHY.body.small} leading-relaxed`}>
              Search for available donors by blood type, location, and district. Connect instantly when you need blood urgently.
            </p>
          </Card>

          <Card className="group hover:border-green-200 dark:hover:border-green-900/50 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-200 dark:shadow-green-900/30">
              <Droplet className="text-white fill-white" size={24} />
            </div>
            <h3 className={`${TYPOGRAPHY.heading.h4} mb-2`}>Donate & Save Lives</h3>
            <p className={`${TYPOGRAPHY.body.small} leading-relaxed`}>
              Connect with recipients and schedule your donation. Every drop counts and can save up to three lives in your community.
            </p>
          </Card>

          <Card className="group hover:border-purple-200 dark:hover:border-purple-900/50 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
              <Award className="text-white" size={24} />
            </div>
            <h3 className={`${TYPOGRAPHY.heading.h4} mb-2`}>Get Recognition</h3>
            <p className={`${TYPOGRAPHY.body.small} leading-relaxed`}>
              Receive certificates and recognition for your contributions. Join our donor appreciation program and inspire others to donate.
            </p>
          </Card>
        </div>

        {/* Why Donate Section */}
        <div className="bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-base-content mb-4">
              Why Donate Blood?
            </h3>
            <p className="text-lg text-base-content/70">
              Your donation makes a real difference in saving lives
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="text-red-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-base-content mb-2">30 mins</h4>
              <p className="text-base-content/70">Average donation time</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="text-red-600 fill-red-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-base-content mb-2">3 Lives</h4>
              <p className="text-base-content/70">Can be saved per donation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="text-red-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-base-content mb-2">Free Health</h4>
              <p className="text-base-content/70">Health screening included</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="text-red-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-base-content mb-2">100% Safe</h4>
              <p className="text-base-content/70">Sterile equipment used</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
