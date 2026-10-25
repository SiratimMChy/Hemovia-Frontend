import { Target, Eye } from 'lucide-react';

const AboutMissionVision = ({ stats }) => {
  return (
    <div className="py-20 bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-base-200 dark:via-base-100 dark:to-base-200">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mission */}
          <div className="bg-base-200 rounded-2xl shadow-xl border border-base-300 p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 dark:shadow-red-900/30">
                <Target className="text-white" size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-base-content">Our Mission</h2>
            </div>
            <p className="text-base-content/70 leading-relaxed text-lg">
              To create a reliable, trusted platform that connects blood donors with recipients in Sylhet and across Bangladesh, 
              ensuring that no life is lost due to blood shortage. With {stats.totalDonors} registered donors and {stats.successfulDonations} lives saved, 
              we're building a strong community of voluntary blood donors, making blood donation accessible, safe, and efficient for everyone.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-base-200 rounded-2xl shadow-xl border border-base-300 p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900/30">
                <Eye className="text-white" size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-base-content">Our Vision</h2>
            </div>
            <p className="text-base-content/70 leading-relaxed text-lg">
              A Bangladesh where every person in need of blood can find a donor quickly and easily. 
              We envision expanding our platform to cover all major cities in Bangladesh, creating a 
              nationwide network of donors and recipients that saves lives through the power of community and technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMissionVision;
