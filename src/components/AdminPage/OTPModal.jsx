// 



import React, { useState, useRef, useEffect } from "react";

const OTPModal = ({ email, onVerified, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const DUMMY_OTP = "123456";

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  const handleChange = (value, index) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < inputRefs.current.length - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      clearOtp();
      onClose?.();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    if (otpCode === DUMMY_OTP) {
      setError("");
      onVerified?.();
      clearOtp();
      return;
    }
    setError("Invalid OTP. Please try again.");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
          OTP Verification
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to the company head for <br />
          <span className="font-medium text-blue-700">{email}</span>
        </p>

        <form onSubmit={handleVerifyOTP} className="space-y-5">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border rounded-md text-xl focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 active:scale-95 transition transform duration-150"
            >
              Verify OTP
            </button>

            <button
              type="button"
              onClick={() => {
                clearOtp();
                onClose?.();
              }}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 active:scale-95 transition transform duration-150"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            For testing: use OTP <span className="font-medium">123456</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPModal;
