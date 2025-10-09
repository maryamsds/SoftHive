import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Video,
  Code,
  MessageSquare,
  Upload,
  MessagesSquare,
  Eye,
  X,
  Filter,
} from "lucide-react";

// Mock Table Component for completeness
const Table = ({ columns, data, actions, currentPage, totalPages, onPageChange }) => {
    // Determine the slice of data to display for the current page
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    // Helper to render pagination buttons
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
                <div className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-lg bg-blue-500 text-white">
                    {currentPage} / {totalPages}
                </div>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                                >
                                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                    {actions && actions(row)}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {paginatedData.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                                No tickets found matching the filter.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {renderPagination()}
        </div>
    );
};


const faqData = [
  {
    question: "How do I connect my account?",
    answer:
      "To connect your account, go to Settings > Integrations and click on 'Connect Account'. Follow the authentication steps to complete the process.",
  },
  {
    question: "How is billing handled?",
    answer:
      "Billing is processed monthly on the date you signed up. You can view and manage your billing information in the Billing section of your account settings.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For enterprise customers, we also support wire transfers.",
  },
  {
    question: "How can I change my subscription plan?",
    answer:
      "You can change your subscription plan at any time by going to Billing > Subscription and selecting 'Change Plan'. Changes take effect on your next billing cycle.",
  },
];

const documentationLinks = [
  { title: "Setup Guides", icon: BookOpen, url: "/docs/setup" },
  { title: "API Documentation", icon: Code, url: "/docs/api" },
  { title: "Video Tutorials", icon: Video, url: "/docs/tutorials" },
];

const initialTickets = [
  {
    id: "TKT-001",
    user: "John Doe",
    email: "john@example.com",
    subject: "API Integration Issue",
    status: "Open",
    date: "2025-10-01",
  },
  {
    id: "TKT-002",
    user: "Jane Smith",
    email: "jane@example.com",
    subject: "Billing Question",
    status: "In Progress",
    date: "2025-09-30",
  },
  {
    id: "TKT-003",
    user: "Bob Johnson",
    email: "bob@example.com",
    subject: "Feature Request",
    status: "Closed",
    date: "2025-09-29",
  },
];

const Supports = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "Technical",
    description: "",
    file: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const itemsPerPage = 10;

  const filteredTickets = tickets.filter(
    (ticket) => statusFilter === "all" || ticket.status === statusFilter
  );

  const handleFaqClick = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit `ticketForm` data here.
    console.log("Submitting ticket:", ticketForm);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setTicketForm({
      subject: "",
      category: "Technical",
      description: "",
      file: null,
    });
  };

  const handleViewTicket = (ticket) => {
    console.log("View ticket:", ticket);
    // Add logic for opening a modal or new view for the ticket
  };

  const handleReplyTicket = (ticket) => {
    console.log("Reply to ticket:", ticket);
    // Add logic for opening a reply interface
  };

  const handleCloseTicket = (ticket) => {
    setTickets(
      tickets.map((t) =>
        t.id === ticket.id ? { ...t, status: "Closed" } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Support Center
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Find answers, get help, or contact support instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* === ROW 1: FAQ and Documentation === */}

        {/* 1. FAQ Section (R1, C1) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
            Frequently Asked Questions
            
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full px-4 py-4 text-left flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleFaqClick(index)}
                >
                  <span className="font-semibold dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-sm border-t border-gray-200 dark:border-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Documentation Links (R1, C2) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
            Quick Resources
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {documentationLinks.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <a
                  key={index}
                  href={doc.url}
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                >
                  <Icon className="h-7 w-7 text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 mr-4 transition-colors" />
                  <span className="font-semibold text-lg dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {doc.title}
                  </span>
                </a>
              );
            })}
          </div>
            {/* Live Chat Placeholder */}
            <div className="mt-auto pt-6">
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <div className="text-center">
                        <MessagesSquare className="h-8 w-8 mx-auto text-blue-500" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                            Live Chat Support
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Coming soon! Real-time assistance for urgent issues.
                        </p>
                    </div>
                </div>
            </div>
        </div>


            {/* === ROW 2: Support Form and Ticket Table === */}

        {/* 3. Create Support Ticket (R2, C1) - The Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
            Create Support Ticket
          </h2>
          <form onSubmit={handleTicketSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject 
              </label>
              <input 
                type="text"
                value={ticketForm.subject}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, subject: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={ticketForm.category}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, category: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors appearance-none"
              >
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={ticketForm.description}
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Attachments (optional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700/50 text-gray-500 rounded-lg border-2 border-blue-300 dark:border-blue-600 border-dashed cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
                  <Upload className="h-8 w-8 text-blue-500" />
                  <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {ticketForm.file ? ticketForm.file.name : "Drop files here or click to upload"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setTicketForm({
                        ...ticketForm,
                        file: e.target.files[0],
                      })
                    }
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-200 transform hover:scale-[1.01]"
            >
              Submit Ticket
            </button>
          </form>
          {showSuccess && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded-lg font-medium border border-green-200 dark:border-green-700">
              Ticket submitted successfully! We'll be in touch soon.
            </div>
          )}
        </div>

        {/* 4. Ticket Management Section (R2, C2) - The Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
            <h2 className="text-2xl font-bold dark:text-white">
              Your Support Tickets
            </h2>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="all">All Tickets</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <Table
            columns={[
              { key: "id", label: "Ticket ID" },
              { key: "user", label: "User" },
              { key: "subject", label: "Subject" },
              {
                key: "status",
                label: "Status",
                render: (status) => (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      status === "Open"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : status === "In Progress"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {status}
                  </span>
                ),
              },
              { key: "date", label: "Date" },
            ]}
            data={filteredTickets}
            actions={(ticket) => (
              <>
                <button
                  onClick={() => handleViewTicket(ticket)}
                  className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-500 transition-colors"
                  title="View ticket details"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleReplyTicket(ticket)}
                  className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500 transition-colors"
                  title="Reply to ticket"
                >
                  <MessageSquare size={18} />
                </button>
                {ticket.status !== "Closed" && (
                  <button
                    onClick={() => handleCloseTicket(ticket)}
                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                    title="Close ticket"
                  >
                    <X size={18} />
                  </button>
                )}
              </>
            )}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTickets.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Supports;
