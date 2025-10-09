import { Check } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0
    },
    features: [
      "Up to 5 users",
      "Basic analytics",
      "24/7 support",
      "1GB storage"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: {
      monthly: 29,
      yearly: 290
    },
    features: [
      "Up to 20 users",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom integrations",
      "API access"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Business",
    price: {
      monthly: 99,
      yearly: 990
    },
    features: [
      "Unlimited users",
      "Enterprise analytics",
      "Dedicated support",
      "Unlimited storage",
      "Custom integrations",
      "API access",
      "SSO & advanced security"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Billing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Choose the plan that's right for your business
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={!isYearly ? 'font-semibold' : 'text-slate-600 dark:text-slate-300'}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isYearly ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={isYearly ? 'font-semibold' : 'text-slate-600 dark:text-slate-300'}>
              Yearly <span className="text-primary">(Save 10%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-transform hover:scale-105 ${
                plan.popular
                  ? 'border-primary shadow-xl bg-gradient-to-b from-primary/10 to-white dark:from-primary/20 dark:to-slate-800'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="px-5 py-1 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white text-sm font-semibold">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">
                    ${isYearly ? (plan.price.yearly * 0.9).toFixed(0) : plan.price.monthly}
                  </span>
                  <span className="text-lg text-slate-500 dark:text-slate-400">
                    {plan.price.monthly === 0 ? '' : isYearly ? '/year' : '/month'}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <span className="flex-none w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-blue-500 text-white hover:opacity-90'
                    : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
