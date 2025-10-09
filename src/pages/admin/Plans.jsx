import { useState } from 'react';
import { CreditCard, Download, Plus, Star, Users, Zap } from 'lucide-react';

const Plans = () => {
  const [currentPlan, setCurrentPlan] = useState('Pro');
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        '25 posts per month',
        '1 team member',
        '100 AI credits',
        'Basic support'
      ]
    },
    {
      name: 'Pro',
      price: 29,
      features: [
        '100 posts per month',
        '3 team members',
        '500 AI credits',
        'Priority support'
      ]
    },
    {
      name: 'Business',
      price: 99,
      features: [
        'Unlimited posts',
        '10 team members',
        '2000 AI credits',
        '24/7 support'
      ]
    }
  ];

  const invoices = [
    {
      id: 'INV-2025-001',
      date: '2025-09-28',
      amount: 29.00,
      status: 'Paid'
    },
    {
      id: 'INV-2025-002',
      date: '2025-08-28',
      amount: 29.00,
      status: 'Paid'
    },
    {
      id: 'INV-2025-003',
      date: '2025-07-28',
      amount: 29.00,
      status: 'Failed'
    }
  ];

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    // Simulated coupon validation
    if (couponCode === 'SAVE20') {
      setCouponMessage({ type: 'success', text: 'Coupon applied successfully!' });
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid coupon code' });
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Plans & Billing
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your subscription, billing, and payment methods.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Current Plan: {currentPlan}</h2>
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span>Usage this month</span>
                <span>25/50 posts</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
            {currentPlan === 'Business' ? 'Downgrade' : 'Upgrade Plan'}
          </button>
        </div>
      </div>

      {/* Plan Options */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl hover:border-purple-500/30 transition-all">
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-purple-500 mr-2" />
              <h3 className="text-xl font-semibold">{plan.name}</h3>
            </div>
            <div className="text-3xl font-bold mb-4">
              ${plan.price}<span className="text-base font-normal text-gray-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <Zap className="w-4 h-4 mr-2 text-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
              Select Plan
            </button>
          </div>
        ))}
      </div>

      {/* Billing History */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b border-gray-200/20">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/5">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Invoice ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/20">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50/5 transition-colors">
                  <td className="px-6 py-4 text-sm">{invoice.id}</td>
                  <td className="px-6 py-4 text-sm">{invoice.date}</td>
                  <td className="px-6 py-4 text-sm">${invoice.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-purple-500 hover:text-purple-600 dark:hover:text-purple-400">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex items-center justify-between p-4 border border-gray-200/20 rounded-xl mb-4">
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 text-purple-500 mr-3" />
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
            </div>
            <button className="text-purple-500 hover:text-purple-600">Edit</button>
          </div>
          <button className="flex items-center text-purple-500 hover:text-purple-600">
            <Plus className="w-5 h-5 mr-1" /> Add New Card
          </button>
        </div>

        {/* Coupon Code */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Coupon Code</h2>
          <form onSubmit={handleCouponSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              />
            </div>
            {couponMessage && (
              <p className={`text-sm ${couponMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {couponMessage.text}
              </p>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            >
              Apply Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Plans;