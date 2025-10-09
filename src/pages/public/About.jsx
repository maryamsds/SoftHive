import { Github, Linkedin, Twitter } from 'lucide-react';

const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries to deliver cutting-edge solutions."
  },
  {
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service."
  },
  {
    title: "Customer Focus",
    description: "Our customers' success is at the heart of everything we do."
  }
];

const team = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    image: "https://api.uifaces.co/our-content/donated/n4Ngwvi7.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Emily Chen",
    role: "CTO",
    image: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "David Kumar",
    role: "Head of Product",
    image: "https://api.uifaces.co/our-content/donated/AVQ3HSEL.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  }
];

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to transform business operations"
  },
  {
    year: "2022",
    title: "Series A Funding",
    description: "Raised $10M to accelerate growth and innovation"
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Opened offices in Europe and Asia"
  }
];

export default function About() {
  return (
    <div className="w-full font-sans">
      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Our Mission
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              To empower businesses with intelligent solutions that drive growth and innovation in the digital age.
            </p>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div className="mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto ring-4 ring-indigo-500"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-1 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{member.role}</p>
                <div className="flex justify-center gap-4">
                  <a
                    href={member.socials.twitter}
                    className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={member.socials.linkedin}
                    className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.socials.github}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-none">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg">
                    {milestone.year}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
