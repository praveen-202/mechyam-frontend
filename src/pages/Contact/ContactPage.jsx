import React, { useState, useEffect } from 'react';
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    serviceType: '',
    message: '',
    captchaAnswer: ''
  });

  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);

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
      const [a, b] = num1 > num2 ? [num1, num2] : [num2, num1];
      question = `${a} - ${b} = ?`;
      answer = a - b;
    }

    setCaptchaQuestion(question);
    setCorrectAnswer(answer);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.captchaAnswer, 10) !== correctAnswer) {
      alert('Captcha answer is incorrect. Please try again.');
      generateCaptcha();
      setFormData({ ...formData, captchaAnswer: '' });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/mechyam/api/contact/submit',
        formData
      );
      alert('Form submitted successfully!');
      console.log(response.data);

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        serviceType: '',
        message: '',
        captchaAnswer: ''
      });
      generateCaptcha();
    } catch (error) {
      if (error.response) {
        console.error('Server response:', error.response.data);
        alert('Failed: ' + JSON.stringify(error.response.data));
      } else {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
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
            <form onSubmit={handleSubmit}>
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
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Service</option>
                  <option value="Structural">Structural</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Career">Career</option>
                </select>
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                ></textarea>
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
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
