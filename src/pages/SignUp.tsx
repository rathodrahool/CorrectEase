import React from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/auth.service";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = React.useState("");
  const [passwordValidation, setPasswordValidation] = React.useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Add password validation function
  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    validatePassword(newPassword);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!Object.values(passwordValidation).every(Boolean)) {
      setError("Please meet all password requirements");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const signupData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      const response = await authService.signup(signupData);

      if (response) {
        localStorage.setItem("verificationEmail", formData.email);
        navigate("/verify-otp");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Add validation for input fields
  const validateForm = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError("Password must contain at least one number");
      return false;
    }
    if (!/[!@#$%^&*]/.test(formData.password)) {
      setError(
        "Password must contain at least one special character (!@#$%^&*)"
      );
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        {/* Logo and Project Name */}
        <Link
          to="/"
          className="flex items-center justify-center gap-3 mb-8 group"
        >
          <div className="w-12 h-12 bg-[#0052CC] rounded-sm flex items-center justify-center text-white font-bold text-2xl">
            CE
          </div>
          <h1 className="text-2xl font-bold text-[#172B4D]">CorrectEase</h1>
        </Link>

        <div className="bg-white border border-[#DFE1E6] rounded-sm shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#172B4D] mb-6 text-center">
            Create your account
          </h2>

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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm
                    focus:ring-2 focus:ring-opacity-25 focus:border-gray-300 focus:ring-gray-300"
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-sm
                    focus:ring-2 focus:ring-opacity-25 focus:border-gray-300 focus:ring-gray-300"
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
                  type={showPassword.password ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className={`w-full pl-10 pr-12 py-2 border rounded-sm
                    focus:ring-2 focus:ring-opacity-25
                    ${
                      formData.password
                        ? Object.values(passwordValidation).every(Boolean)
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                          : "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-gray-300 focus:ring-gray-300"
                    }`}
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A869A] hover:text-[#42526E] transition-colors"
                >
                  {showPassword.password ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="text-xs space-y-1 mt-1">
                <p className="text-[#7A869A]">Password must:</p>
                <ul className="space-y-1">
                  <li className={`flex items-center gap-1 ${passwordValidation.length ? "text-green-600" : "text-red-600"}`}>
                    {passwordValidation.length ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                    Be at least 8 characters long
                  </li>
                  <li className={`flex items-center gap-1 ${passwordValidation.uppercase ? "text-green-600" : "text-red-600"}`}>
                    {passwordValidation.uppercase ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                    Include at least one uppercase letter
                  </li>
                  <li className={`flex items-center gap-1 ${passwordValidation.number ? "text-green-600" : "text-red-600"}`}>
                    {passwordValidation.number ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                    Include at least one number
                  </li>
                  <li className={`flex items-center gap-1 ${passwordValidation.specialChar ? "text-green-600" : "text-red-600"}`}>
                    {passwordValidation.specialChar ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                    Include at least one special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#172B4D]">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A869A]" />
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full pl-10 pr-12 py-2 border rounded-sm
                    focus:ring-2 focus:ring-opacity-25
                    ${
                      formData.confirmPassword
                        ? formData.password === formData.confirmPassword
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                          : "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-gray-300 focus:ring-gray-300"
                    }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A869A] hover:text-[#42526E] transition-colors"
                >
                  {showPassword.confirmPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
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
                  <span>Sign up</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DFE1E6]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-[#7A869A] bg-white">
                  Already have an account?
                </span>
              </div>
            </div>
            <Link
              to="/login"
              className="inline-block w-full py-2 text-center border border-[#0052CC] text-[#0052CC] hover:bg-[#DEEBFF] transition-colors rounded-sm"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
