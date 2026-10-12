import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import auth from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import { FaEnvelope, FaKey, FaArrowLeft } from 'react-icons/fa';
import { Card, Button, Input } from '../Components/UI';
import { TYPOGRAPHY, SPACING } from '../styles/designSystem';

const ForgetPassword = () => {
    const { email: paramEmail } = useParams();
    const [email, setEmail] = useState(paramEmail || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = email.trim();
        if (!emailValue) {
            toast.error('Please enter your email address');
            return;
        }

        setLoading(true);
        sendPasswordResetEmail(auth, emailValue)
            .then(() => {
                toast.success('Password reset email sent! Please check your inbox.');
                setLoading(false);
                window.open('https://mail.google.com', '_blank');
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 lg:px-30 py-10">
            <title>Forget Password</title>
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center text-2xl shadow-sm">
                        <FaKey />
                    </div>
                    <h1 className={`${TYPOGRAPHY.heading.h1} ${SPACING.marginMd} tracking-tight`}>
                        Reset <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Password</span>
                    </h1>
                    <p className={TYPOGRAPHY.body.large}>
                        Enter your registered email address to receive a password reset link
                    </p>
                </div>

                <Card variant="elevated">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <fieldset className="space-y-6">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                label="Email Address"
                                placeholder="Enter your registered email"
                                icon={FaEnvelope}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />

                            <Button type="submit" loading={loading} className="w-full">
                                Reset Password
                            </Button>
                        </fieldset>

                        <div className="text-center mt-6 pt-6 border-t border-base-300">
                            <p className="text-base-content/60">
                                Remember your password?{' '}
                                <Link
                                    className="text-red-600 hover:text-red-700 font-bold hover:font-bold transition-colors inline-flex items-center gap-1.5"
                                    to="/login"
                                >
                                    <FaArrowLeft className="text-xs" /> Back to Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ForgetPassword;
