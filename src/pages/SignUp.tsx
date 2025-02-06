import React from "react";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Signing up with:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/verify-otp"); // Redirect to OTP verification page
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        {/* Logo and Project Name */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#0052CC] rounded-sm flex items-center justify-center text-white font-bold text-2xl">
            CE
          </div>
          <h1 className="text-2xl font-bold text-[#172B4D]">CorrectEase</h1>
        </div>

        {/* Signup Form */}
        <div className="bg-white border border-[#DFE1E6] rounded-sm shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] rounded-sm
                    focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] rounded-sm
                    focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] rounded-sm
                    focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                  placeholder="Create a secure password"
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 
                bg-[#0052CC] text-white hover:bg-[#0065FF] transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign up</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-[#0052CC] hover:underline">
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
