import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import DonateHero from './DonateHero';
import DonateForm from './DonateForm';
import DonateTable from './DonateTable';

const Donate = () => {
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [donateAmount, setDonateAmount] = useState('10');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = Number(donateAmount);
        if (!amount || amount <= 0) return;

        setIsSubmitting(true);
        const donorEmail = user?.email;
        const donorName = user?.displayName || user?.name || 'Anonymous Donor';
        const formData = {
            donateAmount: amount,
            donorEmail,
            donorName
        };

        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                if (res.data?.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch(err => {
                console.error('Error:', err);
                setIsSubmitting(false);
            });
    };

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get('/payment')
            .then(res => {
                setPayments(res.data?.requests || (Array.isArray(res.data) ? res.data : []));
            })
            .catch(err => {
                console.error(err);
            });
    }, [user, axiosSecure]);

    // Smooth auto-scroll when form opens so nothing is cut off
    useEffect(() => {
        if (showForm) {
            setTimeout(() => {
                document.getElementById('donate-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [showForm]);

    // Calculate total donation amount
    const totalDonations = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

    return (
        <div className={`min-h-screen bg-base-100 ${showForm ? 'py-4 sm:py-6' : 'py-8 md:py-12'} transition-all duration-300`}>
            <div className="px-4 lg:px-30 mx-auto">
                <DonateHero showForm={showForm} setShowForm={setShowForm} />

                {/* Donation Form Component - Toggled when clicking Give Fund */}
                <DonateForm
                    showForm={showForm}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    donateAmount={donateAmount}
                    setDonateAmount={setDonateAmount}
                />

                {/* Show Total Donations and Payments Table only when form is closed */}
                {!showForm && <DonateTable payments={payments} totalDonations={totalDonations} />}
            </div>
        </div>
    );
};

export default Donate;
