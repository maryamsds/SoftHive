import { useState } from 'react';
import { 
  User, 
  Search, 
  Edit2, 
  Trash2, 
  Ban, 
  UserPlus, 
  Filter,
  MoreVertical,
  Shield,
  Activity
} from 'lucide-react';

const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Business',
    role: 'Owner',
    status: 'Active',
    usage: {
      apiCalls: 1250,
      campaignsCreated: 15,
      postsPublished: 45,
      lastLogin: '2025-09-30T10:00:00'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    plan: 'Pro',
    role: 'Admin',
    status: 'Active',
    usage: {
      apiCalls: 850,
      campaignsCreated: 8,
      postsPublished: 32,
      lastLogin: '2025-10-01T09:30:00'
    }
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    plan: 'Pro',
    role: 'Editor',
    status: 'Active',
    usage: {
      apiCalls: 520,
      campaignsCreated: 5,
      postsPublished: 28,
      lastLogin: '2025-09-29T16:45:00'
    }
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    plan: 'Free',
    role: 'Viewer',
    status: 'Suspended',
    usage: {
      apiCalls: 150,
      campaignsCreated: 2,
      postsPublished: 8,
      lastLogin: '2025-09-15T11:20:00'
    }
  }
];

const roles = [
  {
    name: 'Owner',
    permissions: ['Full access', 'Manage billing', 'Add/remove users', 'All admin actions'],
    color: 'purple'
  },
  {
    name: 'Admin',
    permissions: ['Manage users', 'Create/edit content', 'View analytics', 'Configure settings'],
    color: 'blue'
  },
  {
    name: 'Editor',
    permissions: ['Create/edit content', 'Publish posts', 'View analytics'],
    color: 'orange'
  },
  {
    name: 'Viewer',
    permissions: ['View content', 'View analytics'],
    color: 'gray'
  }
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    plan: '',
    status: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const itemsPerPage = 10;

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesPlan = !filters.plan || user.plan === filters.plan;
    const matchesStatus = !filters.status || user.status === filters.status;

    return matchesSearch && matchesRole && matchesPlan && matchesStatus;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleAction = (action, user) => {
    setSelectedUser(user);
    switch (action) {
      case 'edit':
        setIsAddUserOpen(true);
        break;
      case 'delete':
        setIsDeleteModalOpen(true);
        break;
      case 'toggle-status':
        const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, status: newStatus } : u
        ));
        break;
      case 'expand':
        setExpandedUser(expandedUser?.id === user.id ? null : user);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage all platform users & roles.
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
            />
          </div>
          <select
            value={filters.role}
            onChange={(e) => handleFilter('role', e.target.value)}
            className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role.name} value={role.name}>{role.name}</option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) => handleFilter('status', e.target.value)}
            className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <button
          onClick={() => setIsAddUserOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/20">
              {filteredUsers.map((user) => (
                <>
                  <tr key={user.id} className="hover:bg-gray-50/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Owner' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        user.role === 'Admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        user.role === 'Editor' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleAction('expand', user)}
                          className="p-2 hover:bg-purple-500/10 rounded-lg text-purple-500"
                        >
                          <Activity className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAction('edit', user)}
                          className="p-2 hover:bg-purple-500/10 rounded-lg text-purple-500"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAction('toggle-status', user)}
                          className="p-2 hover:bg-purple-500/10 rounded-lg text-purple-500"
                        >
                          <Ban className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAction('delete', user)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedUser?.id === user.id && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50/5">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-4 rounded-xl bg-white/5">
                            <div className="text-sm text-gray-500">API Calls</div>
                            <div className="mt-1 text-2xl font-semibold">{user.usage.apiCalls}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5">
                            <div className="text-sm text-gray-500">Campaigns</div>
                            <div className="mt-1 text-2xl font-semibold">{user.usage.campaignsCreated}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5">
                            <div className="text-sm text-gray-500">Posts</div>
                            <div className="mt-1 text-2xl font-semibold">{user.usage.postsPublished}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5">
                            <div className="text-sm text-gray-500">Last Login</div>
                            <div className="mt-1 text-sm font-medium">
                              {new Date(user.usage.lastLogin).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Management */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-semibold">Role Management</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <div key={role.name} className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  role.color === 'purple' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                  role.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  role.color === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {role.name}
                </span>
                <button className="text-gray-500 hover:text-purple-500">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-2">
                {role.permissions.map((permission, index) => (
                  <li key={index} className="text-sm text-gray-500">• {permission}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none">
                  {roles.map(role => (
                    <option key={role.name} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Plan</label>
                <select className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none">
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-500"></div>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200/20 hover:bg-gray-50/5"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                {selectedUser ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Delete User</h2>
            <p className="text-gray-500">
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200/20 hover:bg-gray-50/5"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setUsers(users.filter(u => u.id !== selectedUser?.id));
                  setIsDeleteModalOpen(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-red-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
