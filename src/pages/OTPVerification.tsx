import React from "react";
import { useNavigate, Link } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const otpString = otp.join("");
      console.log("Verifying OTP:", otpString);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      navigate("/"); // Redirect to main app after verification
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto p-6">
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
          <h2 className="text-center text-xl font-semibold text-[#172B4D] mb-2">
            Verify Your Email
          </h2>
          <p className="text-center text-sm text-[#7A869A] mb-6">
            Enter the 6-digit code sent to your email
          </p>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-[#DFE1E6] 
                    rounded-sm focus:border-[#2684FF] focus:ring-2 focus:ring-[#2684FF] 
                    focus:ring-opacity-25 text-[#172B4D]"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 
                bg-[#0052CC] text-white hover:bg-[#0065FF] transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <button
              className="text-sm text-[#0052CC] hover:underline"
              onClick={() => {
                /* Resend logic */
              }}
            >
              Didn't receive the code?
            </button>
            <Link
              to="/signup"
              className="block text-sm text-[#7A869A] hover:text-[#42526E]"
            >
              Change email address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
