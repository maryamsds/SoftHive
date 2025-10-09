import React, { useState } from 'react';
import { Edit, Trash2, Plus, Package, X, AlertTriangle } from 'lucide-react';

const initialPlans = [
  {
    id: 1,
    name: 'Free Plan',
    price: 0,
    postLimit: 25,
    features: ['Basic Support', '1 Team Member', '100 AI Credits'],
    status: 'Active'
  },
  {
    id: 2,
    name: 'Pro Plan',
    price: 29,
    postLimit: 100,
    features: ['Priority Support', '3 Team Members', '500 AI Credits'],
    status: 'Active'
  },
  {
    id: 3,
    name: 'Business Plan',
    price: 99,
    postLimit: 500,
    features: ['24/7 Support', '10 Team Members', '2000 AI Credits'],
    status: 'Active'
  }
];

const ManagePlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    postLimit: '',
    features: '',
    status: 'Active'
  });

  const handleCreatePlan = (e) => {
    e.preventDefault();
    const features = newPlan.features.split('\n').filter(f => f.trim());
    const plan = {
      id: plans.length + 1,
      ...newPlan,
      features
    };
    setPlans([...plans, plan]);
    setNewPlan({
      name: '',
      price: '',
      postLimit: '',
      features: '',
      status: 'Active'
    });
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setNewPlan({
      ...plan,
      features: plan.features.join('\n')
    });
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (plan) => {
    setSelectedPlan(plan);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setPlans(plans.filter(p => p.id !== selectedPlan.id));
    setIsDeleteModalOpen(false);
    setSelectedPlan(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const features = newPlan.features.split('\n').filter(f => f.trim());
    const updatedPlans = plans.map(p =>
      p.id === selectedPlan.id ? { ...newPlan, features } : p
    );
    setPlans(updatedPlans);
    setIsModalOpen(false);
    setEditMode(false);
    setSelectedPlan(null);
  };

  const toggleStatus = (id) => {
    setPlans(plans.map(p =>
      p.id === id
        ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
        : p
    ));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Manage Plans
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Control all subscription tiers and pricing.
        </p>
      </div>

      {/* Plans Table - Desktop */}
      <div className="hidden lg:block rounded-xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/5">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Plan Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Posts Limit</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Features</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/20">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50/5 transition-colors">
                <td className="px-6 py-4">{plan.name}</td>
                <td className="px-6 py-4">${plan.price}/mo</td>
                <td className="px-6 py-4">{plan.postLimit}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc list-inside">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(plan.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      plan.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {plan.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="p-2 hover:bg-purple-500/10 rounded-lg text-purple-500"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plans Cards - Mobile & Tablet */}
      <div className="lg:hidden grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">${plan.price}/mo</p>
              </div>
              <button
                onClick={() => toggleStatus(plan.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plan.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}
              >
                {plan.status}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Posts Limit</p>
                <p>{plan.postLimit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Features</p>
                <ul className="list-disc list-inside">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm">{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(plan)}
                  className="flex-1 p-2 hover:bg-purple-500/10 rounded-lg text-purple-500 flex items-center justify-center"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan)}
                  className="flex-1 p-2 hover:bg-red-500/10 rounded-lg text-red-500 flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Plan Form */}
      <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create New Plan
        </h2>
        <form onSubmit={handleCreatePlan} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Plan Name</label>
            <input
              type="text"
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price (Monthly)</label>
            <input
              type="number"
              value={newPlan.price}
              onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
              className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Post Limit</label>
            <input
              type="number"
              value={newPlan.postLimit}
              onChange={(e) => setNewPlan({ ...newPlan, postLimit: e.target.value })}
              className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={newPlan.status}
              onChange={(e) => setNewPlan({ ...newPlan, status: e.target.value })}
              className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Features (one per line)</label>
            <textarea
              value={newPlan.features}
              onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
              className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none h-32"
              placeholder="Enter features (one per line)"
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit Plan</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditMode(false);
                  setSelectedPlan(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveChanges} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Plan Name</label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price (Monthly)</label>
                <input
                  type="number"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Post Limit</label>
                <input
                  type="number"
                  value={newPlan.postLimit}
                  onChange={(e) => setNewPlan({ ...newPlan, postLimit: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={newPlan.status}
                  onChange={(e) => setNewPlan({ ...newPlan, status: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                <textarea
                  value={newPlan.features}
                  onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none h-32"
                  placeholder="Enter features (one per line)"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditMode(false);
                    setSelectedPlan(null);
                  }}
                  className="flex-1 px-6 py-2 bg-gray-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4 text-red-500">
              <AlertTriangle className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold">Delete Plan</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{selectedPlan?.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-2 bg-red-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedPlan(null);
                }}
                className="flex-1 px-6 py-2 bg-gray-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlans;