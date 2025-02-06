import React from "react";
import { FiLock, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      console.log("Resetting password with:", passwords.password);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/login"); // Redirect to login after success
    } catch (error) {
      console.error("Failed to reset password:", error);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        {/* Logo and Project Name */}
        <Link
          to="/"
          className="flex items-center justify-center gap-3 mb-8 group"
        >
          <div className="w-12 h-12 bg-[#0052CC] rounded-sm flex items-center justify-center text-white font-bold text-2xl group-hover:bg-[#0065FF] transition-colors">
            CE
          </div>
          <h1 className="text-2xl font-bold text-[#172B4D] group-hover:text-[#0052CC] transition-colors">
            CorrectEase
          </h1>
        </Link>

        <div className="bg-white border border-[#DFE1E6] rounded-sm shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#172B4D] mb-2 text-center">
            Reset Your Password
          </h2>
          <p className="text-sm text-[#7A869A] mb-6 text-center">
            Please enter your new password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={passwords.password}
                  onChange={(e) =>
                    setPasswords({ ...passwords, password: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] rounded-sm
                    focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type="password"
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] rounded-sm
                    focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-[#DE350B] bg-[#FFEBE6] p-2 rounded">
                {error}
              </p>
            )}

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
                  <span>Reset Password</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-[#0052CC] hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
