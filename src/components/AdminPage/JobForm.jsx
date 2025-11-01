// src/components/AdminPage/JobForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"; // Spinner icon

const JobForm = ({ onAddJob }) => {
  // ------------------- State Management -------------------
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    description: "",
    requirements: "",
    responsibilities: "",
    salaryRange: "",
    numberOfOpenings: "",
    closingDate: "",
  });

  const [loading, setLoading] = useState(false); // Spinner control

  // ------------------- Input Change Handler -------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ------------------- Submit Handler -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.jobTitle || !formData.department || !formData.numberOfOpenings) {
      alert("Please fill in required fields including Number of Openings.");
      return;
    }

    // Prepare data for backend
    const jobData = {
      ...formData,
      postedDate: new Date().toISOString(),
      numberOfOpenings: parseInt(formData.numberOfOpenings, 10),
      isActive: true, // Always true internally
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://192.168.1.192:8085/mechyam/api/career/jobs",
        jobData
      );

      alert("Job posted successfully!");

      if (onAddJob) onAddJob(response.data);

      // Reset form
      setFormData({
        jobTitle: "",
        department: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        description: "",
        requirements: "",
        responsibilities: "",
        salaryRange: "",
        numberOfOpenings: "",
        closingDate: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- JSX Layout -------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 py-10 px-6">
      {/* Job Posting Form Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-rows gap-8">
          {/* Job Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Job Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Experience Level</option>
              <option value="ENTRY">Entry</option>
              <option value="MID">Mid</option>
              <option value="SENIOR">Senior</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="3"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Enter job requirements"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="3"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Responsibilities</label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Enter job responsibilities"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="3"
            />
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Salary Range</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g. ₹30,000 - ₹50,000"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Number of Openings */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Number of Openings</label>
            <input
              type="number"
              name="numberOfOpenings"
              value={formData.numberOfOpenings}
              onChange={handleChange}
              placeholder="Enter number of openings"
              min="1"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Closing Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Last Date to Apply</label>
            <input
              type="date"
              name="closingDate"
              value={formData.closingDate}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-400 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Uploading...
              </>
            ) : (
              "Upload Job"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
