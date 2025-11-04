
import React, { useState, useRef, useEffect } from "react";

const OTPModal = ({ email, tempToken, onVerified, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Enter 6-digit OTP");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:8080/mechyam/api/admin/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tempToken}`,
          },
          body: JSON.stringify({ email, otp: otpCode }),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        sessionStorage.setItem("adminToken", data.token);
        onVerified(data.token);
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch {
      setError("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-[350px] text-center">
        <h2 className="font-bold text-lg mb-2">Enter OTP</h2>

        <form onSubmit={handleVerifyOTP}>
          <div className="flex justify-center gap-2 mb-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                ref={(el) => (inputRefs.current[i] = el)}
                className="w-10 h-10 border text-center text-lg rounded"
              />
            ))}
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button className="w-full bg-blue-900 text-white py-2 rounded">
            {submitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button onClick={onClose} className="mt-2 w-full border py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OTPModal;

