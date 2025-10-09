// src/pages/auth/VerifyEmail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let isCalled = false;

    const verify = async () => {
      if (isCalled) return; // prevent duplicate
      isCalled = true;

      try {
        const res = await axiosInstance.get(`/auth/verify-email/${token}`);
        const data = res.data;

        if (res.status === 200) {
          setMessage('Your email has been verified successfully!');
          setIsVerified(true);

          // ✅ Redirect to login after 2 seconds
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setMessage(data.message || 'Invalid or expired verification link.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Something went wrong while verifying your email.');
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md text-center">
        <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
          <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{message}</h2>

        {isVerified && (
          <a
            href="/login"
            className="block mt-4 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium"
          >
            Go to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
