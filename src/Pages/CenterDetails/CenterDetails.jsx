import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Building, CheckCircle } from 'lucide-react';
import useAxios from '../../Hooks/useAxios';
import CenterHeader from './CenterHeader';
import CenterSidebar from './CenterSidebar';

const CenterDetails = () => {
  const { id } = useParams();
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get(`/centers/${id}`)
      .then(res => {
        setCenter(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading center:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-red-500 mb-4"></div>
          <p className="text-base-content/70">Loading center details...</p>
        </div>
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <Building className="mx-auto text-base-content/40 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-base-content mb-2">Center Not Found</h2>
          <p className="text-base-content/60 mb-6">The donation center you're looking for doesn't exist or hasn't been added yet.</p>
          <Link 
            to="/center" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Back to Centers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <CenterHeader center={center} />

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6 lg:space-y-8">
            {/* About */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-bold text-base-content mb-4">About This Center</h2>
              <p className="text-base-content/70 leading-relaxed">
                {center.description || `${center.name} is a trusted blood donation center located in ${center.district}, ${center.division}. We provide safe and reliable blood donation services with professional medical staff and modern facilities. Our commitment is to ensure the highest standards of safety and care for all donors while serving the community's blood needs.`}
              </p>
            </div>

            {/* Facilities */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-bold text-base-content mb-4">Facilities & Services</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {center.facilities && center.facilities.length > 0 ? (
                  center.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <CheckCircle className="text-green-600 shrink-0" size={18} />
                      <span className="text-base-content/70">{facility}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-base-content/50">Facility information will be updated soon.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Blood Types Available */}
            <div className="bg-base-100 border-2 border-base-300 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-bold text-base-content mb-4">Available Blood Types</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {(center.bloodTypes || ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).map((type, index) => (
                  <div key={index} className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-900/50 rounded-lg p-3 text-center">
                    <span className="font-bold text-red-600 dark:text-red-400">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <CenterSidebar center={center} />
        </div>
      </div>
    </div>
  );
};

export default CenterDetails;
