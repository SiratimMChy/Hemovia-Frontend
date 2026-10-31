import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Hemovia Support',
                reply_to: formData.email
            };
            await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="bg-base-200 border-2 border-base-300 rounded-2xl p-5 sm:p-7 md:p-8 shadow-sm h-full flex flex-col justify-between">
            <div>
                <div className="mb-5">
                    <h3 className="text-xl sm:text-2xl font-bold text-base-content">Send us a Message</h3>
                    <p className="text-xs sm:text-sm text-base-content/70 mt-1">Fill out the form below and we will get back to you within 24 hours.</p>
                </div>

                {submitStatus === 'success' && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 size={18} className="shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm">Message sent successfully! We will reply soon.</span>
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertCircle size={18} className="shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm">Failed to send message. Please try again or call our hotline.</span>
                    </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-base-content mb-1.5 uppercase tracking-wide">Your Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required disabled={isSubmitting} className="w-full px-3.5 py-2.5 rounded-xl border-2 border-base-300 focus:border-red-500 focus:outline-none bg-base-100 text-base-content text-sm font-medium transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-base-content mb-1.5 uppercase tracking-wide">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required disabled={isSubmitting} className="w-full px-3.5 py-2.5 rounded-xl border-2 border-base-300 focus:border-red-500 focus:outline-none bg-base-100 text-base-content text-sm font-medium transition-colors" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-base-content mb-1.5 uppercase tracking-wide">Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you?" rows={4} required disabled={isSubmitting} className="w-full px-3.5 py-2.5 rounded-xl border-2 border-base-300 focus:border-red-500 focus:outline-none resize-none bg-base-100 text-base-content text-sm font-medium transition-colors" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-70 text-white font-bold py-3 rounded-xl text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2">
                        {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Send size={16} />}
                        <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
