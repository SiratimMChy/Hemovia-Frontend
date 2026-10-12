import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <div className="py-24 bg-base-100">
      <div className="px-4 lg:px-30 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4 shadow-sm">
            <MessageSquare className="text-red-600 dark:text-red-400" size={16} />
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-base-content/70">
            We're here to help 24/7. Reach out anytime you need assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm />

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-1">Phone Number</p>
                    <p className="text-xl font-bold">+880-1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-1">Email Address</p>
                    <p className="text-xl font-bold break-all">support@Hemovia.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold mb-1">Location</p>
                    <p className="text-xl font-bold">Sylhet, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="tel:+8801234567890"
              className="block bg-base-200 border-2 border-red-600 text-red-600 px-8 py-5 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition text-center text-lg shadow-lg"
            >
              <Phone className="inline-block mr-2" size={24} />
              Emergency Hotline - Call Now
            </a>

            <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-red-600" size={24} />
                <h4 className="font-bold text-base-content text-lg">Working Hours</h4>
              </div>
              <div className="space-y-2 text-base-content/70">
                <div className="flex justify-between">
                  <span className="font-semibold">Monday - Friday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Saturday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sunday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
