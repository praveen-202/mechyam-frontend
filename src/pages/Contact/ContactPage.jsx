import React, { useState, useEffect } from 'react';
import axios from "axios";
import contactBanner from "../../assets/contact-us.jpg"; // ✅ Import image

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    subject: '',
    message: '',
    captchaAnswer: ''
  });

  const [errors, setErrors] = useState({});
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question = '';
    let answer = 0;

    if (operator === '+') {
      question = `${num1} + ${num2} = ?`;
      answer = num1 + num2;
    } else {
      const a = Math.max(num1, num2);
      const b = Math.min(num1, num2);
      question = `${a} - ${b} = ?`;
      answer = a - b;
    }

    setCaptchaQuestion(question);
    setCorrectAnswer(answer);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // ✅ Live field validation
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!/^[A-Za-z\s]*$/.test(value)) {
          message = "Name should contain only letters.";
        }
        break;
      case "email":
        if (value && (!value.includes("@") || !value.endsWith(".com"))) {
          message = "Invalid email format.";
        }
        break;
      case "phoneNumber":
        if (value && !/^\d{0,10}$/.test(value)) {
          message = "Phone number must contain only digits.";
        } else if (value.length > 10) {
          message = "Phone number must be exactly 10 digits.";
        }
        break;
      case "message":
        if (value.length > 1000) {
          message = "Message cannot exceed 1000 characters.";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || !/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters.";
    }
    if (!formData.email.includes("@") || !formData.email.endsWith(".com")) {
      newErrors.email = "Invalid email format.";
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }
    if (formData.message.length > 1000) {
      newErrors.message = "Message cannot exceed 1000 characters.";
    }
    if (parseInt(formData.captchaAnswer, 10) !== correctAnswer) {
      newErrors.captchaAnswer = "Captcha answer is incorrect.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.countryCode + formData.phoneNumber,
        subject: formData.subject,
        message: formData.message,
        captchaAnswer: parseInt(formData.captchaAnswer, 10)
      };

      await axios.post("http://localhost:8080/mechyam/api/contact/submit", payload);
      alert("Form submitted successfully!");

      setFormData({
        name: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        subject: '',
        message: '',
        captchaAnswer: ''
      });
      setErrors({});
      generateCaptcha();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Banner Section */}
      <div
        className="relative bg-cover bg-top h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${contactBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "top", // ✅ shows top part of image
        }}
      >
        {/* Dark Overlay for text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <h1 className="text-4xl font-bold relative z-10">Contact Us</h1>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-wrap">
        {/* Left Side */}
        <div className="w-full md:w-1/2 pr-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Structural Inquiries:</h2>
            <p>630-539-8200</p>
            <p>Extension: 5202, 5204</p>
            <p>sales@mechyam.com</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mechanical Inquiries:</h2>
            <p>630-539-8200</p>
            <p>Extension: 6104, 6109</p>
            <p>sales@mechyam.com</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Career Inquiries</h2>
            <p>careers@mechyam.com</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Get in touch with us</h2>
            <form onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData({ ...formData, email: value });

                    // ✅ Custom email validation logic
                    let message = "";
                    if (value.includes("@") && !value.endsWith(".com")) {
                      message = "Invalid email format.";
                    } else if (!value.includes("@")) {
                      message = ""; // no error before '@'
                    }

                    setErrors((prev) => ({ ...prev, email: message }));
                  }}
                  placeholder="Email"
                  className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : ""
                    }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>


              {/* Country Code + Phone */}
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  placeholder="+91"
                  className="w-1/4 p-2 border rounded"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-3/4 p-2 border rounded"
                  required
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}

              {/* Subject */}
              <div className="mb-4">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message (max 1000 characters)"
                  className="w-full p-2 border rounded"
                  rows="4"
                  maxLength="1000"
                  required
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Captcha */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Solve: {captchaQuestion}
                </label>
                <input
                  type="number"
                  name="captchaAnswer"
                  value={formData.captchaAnswer}
                  onChange={handleChange}
                  placeholder="Enter your answer"
                  className="w-full p-2 border rounded"
                  required
                />
                {errors.captchaAnswer && <p className="text-red-500 text-sm mt-1">{errors.captchaAnswer}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
