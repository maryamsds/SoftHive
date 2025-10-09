import { ArrowRight, CheckCircle, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Users className="w-7 h-7 text-gradient-primary" />,
    title: "Team Collaboration",
    description: "Work seamlessly with your team members in real-time"
  },
  {
    icon: <Star className="w-7 h-7 text-gradient-primary" />,
    title: "Advanced Analytics",
    description: "Get detailed insights into your business performance"
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-gradient-primary" />,
    title: "Automated Workflow",
    description: "Streamline your processes with intelligent automation"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechCorp",
    content: "This platform has transformed how we manage our projects.",
    avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    content: "The best solution we've found for our team's needs.",
    avatar: "https://api.uifaces.co/our-content/donated/FJkauyR8.jpg"
  }
];

export default function Home() {
  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Transform Your Business with AI-Powered Solutions
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Streamline operations, boost productivity, and make data-driven decisions with our cutting-edge SaaS platform.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link
                to="/signup"
                className="inline-flex items-center px-7 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center px-7 py-3 rounded-full border border-white/50 hover:bg-white/10 transition"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powerful Features for Your Business
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Trusted by Industry Leaders
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-5">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 ring-2 ring-purple-500"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Join thousands of businesses already using our platform
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-10 py-4 rounded-full bg-white text-purple-600 font-semibold hover:bg-gray-100 transition"
          >
            Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
