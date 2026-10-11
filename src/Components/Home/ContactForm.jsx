import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const templateParams = { from_name: formData.name, from_email: formData.email, message: formData.message, to_name: 'Hemovia Support', reply_to: formData.email };
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
          <Send className="text-white" size={20} />
        </div>
        <h3 className="text-2xl font-bold text-base-content">Send us a Message</h3>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-4 p-3.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2.5">
          <CheckCircle className="text-green-600 shrink-0" size={18} />
          <p className="text-green-800 font-semibold text-xs">Message sent successfully! We'll get back to you within 24 hours.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5">
          <AlertCircle className="text-red-600 shrink-0" size={18} />
          <p className="text-red-800 font-semibold text-xs">Failed to send message. Please try again or contact us directly.</p>
        </div>
      )}

      <form onSubmit={handleContactSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-base-content mb-1">Your Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-2.5 rounded-xl border border-base-300 focus:border-red-500 focus:outline-none bg-base-100 text-base-content" required disabled={isSubmitting} />
          </div>
          <div>
            <label className="block text-sm font-bold text-base-content mb-1">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-2.5 rounded-xl border border-base-300 focus:border-red-500 focus:outline-none bg-base-100 text-base-content" required disabled={isSubmitting} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-base-content mb-1">Message *</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." className="w-full px-4 py-2.5 rounded-xl border border-base-300 focus:border-red-500 focus:outline-none h-28 resize-none bg-base-100 text-base-content" required disabled={isSubmitting} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg text-white hover:scale-[1.02]'
          }`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Send size={18} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
      <p className="text-xs text-base-content/60 text-center mt-4">Response Time: We typically respond within 24 hours.</p>
    </div>
  );
};

export default ContactForm;
