import React from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Sending reset link to:", email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEmailSent(true);
    } catch (error) {
      console.error("Failed to send reset email:", error);
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
          {!isEmailSent ? (
            <>
              <h2 className="text-xl font-semibold text-[#172B4D] mb-2 text-center">
                Reset Password
              </h2>
              <p className="text-sm text-[#7A869A] mb-6 text-center">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#172B4D]">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-[#DFE1E6] rounded-sm
                        focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25"
                      placeholder="Enter your email"
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
                      <span>Send Reset Link</span>
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-[#0052CC] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#172B4D] mb-2">
                Check your email
              </h2>
              <p className="text-sm text-[#7A869A] mb-4">
                We've sent password reset instructions to:
                <br />
                <span className="font-medium text-[#172B4D]">{email}</span>
              </p>
              <button
                onClick={() => setIsEmailSent(false)}
                className="text-sm text-[#0052CC] hover:underline"
              >
                Try another email
              </button>
            </div>
          )}

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

export default ForgotPassword;
