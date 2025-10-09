import { useEffect, useState } from "react";
import axiosInstance from '../../api/axiosInstance';
import { User, Eye, EyeOff, PenSquare } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    role: "",
    bio: "",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [notifications, setNotifications] = useState({ email: true, push: false, inApp: true });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  // ✅ Fetch user profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/auth/me", { withCredentials: true });
        console.log("Fetched profile:", res.data);

        if (res.data?.user) {
          const [firstName, lastName] = res.data.user.name
            ? res.data.user.name.split(" ")
            : ["", ""];

          setProfile({
            firstName,
            lastName,
            email: res.data.user.email,
            contact: res.data.user.contact || "",
            bio: res.data.user.bio || "",
            role: res.data.user.role || "",
            isActive: res.data.user.isEmailVerified || false,
            lastLogin: res.data.user.lastLogin || null, // ✅ add this
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveInfo = async () => {
    try {
      const updatedData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        contact: profile.contact,
        bio: profile.bio,
      };

      const response = await axiosInstance.put("/auth/update", updatedData, {
        withCredentials: true,
      });

      console.log("✅ Profile updated successfully:", response.data);

      // ✅ Update UI immediately with new backend data
      if (response.data?.user) {
        setProfile({
          firstName: response.data.user.name?.split(" ")[0] || "",
          lastName: response.data.user.name?.split(" ")[1] || "",
          email: response.data.user.email || "",
          contact: response.data.user.contact || "",
          bio: response.data.user.bio || "",
          role: response.data.user.role || "",
        });
      }

      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!passwords.current || !passwords.new || !passwords.confirm) {
        return alert("Please fill out all password fields.");
      }

      if (passwords.new !== passwords.confirm) {
        return alert("New password and confirmation do not match.");
      }

      const response = await axiosInstance.put(
        "/auth//updatepass",
        {
          currentPassword: passwords.current,
          newPassword: passwords.new,
        },
        { withCredentials: true }
      );

      console.log("Password updated successfully:", response.data);
      alert("✅ Password updated successfully!");

      // Reset password fields
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      console.error("❌ Error updating password:", error);
      alert(error.response?.data?.message || "Failed to update password. Please try again.");
    }
  };

  // if (loading) return <div className="p-8 text-center text-gray-400">Loading profile...</div>;
  const formatLastLogin = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return "Just now";
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleString(); // fallback for older logins
  };


  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT SIDE: Profile Summary */}
      <div className="space-y-4">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
          <div className="flex items-center gap-4">
            <label className="relative cursor-pointer shrink-0">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-500" />
                </div>
              )}
              <div className="absolute -left-1 -bottom-1 bg-purple-500 rounded-full p-1 shadow-lg">
                <PenSquare className="w-3 h-3 text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProfile({
                      ...profile,
                      avatar: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            </label>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-sm text-gray-400 truncate">{profile.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-400 font-medium">
                  {profile.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
            <div className="text-sm text-gray-400">Last Login</div>
            <div className="font-medium mt-1">
              {formatLastLogin(profile.lastLogin)}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
            <div className="text-sm text-gray-400">Account Status</div>
            <div className={`font-medium mt-1 ${profile.isActive ? "text-green-400" : "text-red-400"}`}>
              {profile.isActive ? "Active" : "Inactive"}
            </div>
          </div>

        </div>

        {/* Contact Info */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl space-y-3">
          <h3 className="font-medium">Contact Info</h3>
          <div className="text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span>Phone:</span>
              <span className="text-black dark:text-white">{profile.contact}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <span>Email:</span>
              <span className="text-black dark:text-white truncate">{profile.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Tabs Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Tabs Header */}
        <div className="flex space-x-4 border-b border-gray-700 pb-2">
          {[
            { key: "profile", label: "Profile Info" },
            { key: "password", label: "Change Password" },
            { key: "notifications", label: "Notifications" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 font-medium ${activeTab === tab.key
                ? "text-purple-500 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-200/20 shadow-xl">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">
                Update Profile Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                    placeholder="Enter first name"
                    className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 outline-none"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                    placeholder="Enter last name"
                    className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              {/* Email and Contact Number in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 outline-none"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={profile.contact}
                    onChange={(e) =>
                      setProfile({ ...profile, contact: e.target.value })
                    }
                    placeholder="Enter contact number"
                    className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              {/* Role (Read-Only) */}
              <div>
                <label className="block text-sm mb-1">Role</label>
                <input
                  type="text"
                  value={profile.role}
                  readOnly
                  className="w-full p-2 rounded-xl bg-gray-800/30 border border-gray-200/20 text-white dark:text-gray-400 cursor-not-allowed"
                />
              </div>

              {/* Bio (Optional) */}
              <div>
                <label className="block text-sm mb-1">
                  Bio <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Write something about yourself..."
                  rows={4}
                  className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSaveInfo}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition"
              >
                Save Changes
              </button>

            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === "password" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              {["current", "new", "confirm"].map((field) => (
                <div key={field}>
                  <label className="block text-sm mb-1 capitalize">
                    {field === "confirm"
                      ? "Confirm Password"
                      : `${field} Password`}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords[field]}
                      onChange={(e) =>
                        setPasswords({ ...passwords, [field]: e.target.value })
                      }
                      className="w-full p-2 rounded-xl bg-white/5 border border-gray-200/20 focus:border-purple-500 outline-none"
                    />
                    {field === "new" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-medium hover:opacity-90 transition"
                onClick={handleUpdatePassword}>
                Save Password
              </button>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">
                Manage Notifications
              </h2>
              {[
                { key: "email", label: "Email Alerts" },
                { key: "push", label: "Push Notifications" },
                { key: "inApp", label: "In-App Notifications" },
              ].map((n) => (
                <div
                  key={n.key}
                  className="flex items-center justify-between py-2 border-b border-gray-700/30"
                >
                  <p>{n.label}</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[n.key]}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          [n.key]: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
