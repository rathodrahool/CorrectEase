import React from "react";
import { FiUser, FiMail, FiLock, FiTrash2 } from "react-icons/fi";

const Profile: React.FC = () => {
  const [profile, setProfile] = React.useState({
    fullName: "John Doe",
    email: "john@example.com",
    password: "",
  });

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile);
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Deleting account...");
      // Implement account deletion logic here
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white border border-[#DFE1E6] rounded-sm shadow-sm">
        <div className="border-b border-[#DFE1E6] px-6 py-4">
          <h2 className="text-xl font-semibold text-[#172B4D]">
            Profile Settings
          </h2>
          <p className="text-sm text-[#7A869A] mt-1">
            Manage your account information
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Change Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#DFE1E6]">
            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 px-4 py-2 text-[#DE350B] hover:bg-[#FFEBE6] transition-colors rounded"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>

            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-4 py-2 bg-[#0052CC] text-white hover:bg-[#0065FF] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
