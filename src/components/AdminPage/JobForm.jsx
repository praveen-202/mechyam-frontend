// src/components/AdminPage/JobForm.jsx
import React, { useState } from "react";
import axios from "axios";

const JobForm = ({ onAddJob }) => {
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
    isActive: true,
    closingDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.department) {
      alert("Please fill in required fields.");
      return;
    }

    const jobData = {
      ...formData,
      postedDate: new Date().toISOString(),
    };

    try {
      // ✅ Send data to backend API
      const response = await axios.post(
        "http://localhost:8080/mechyam/api/career/jobs",
        jobData
      );

      console.log("✅ Job uploaded:", response.data);
      alert("Job posted successfully!");

      // Update UI if parent has handler
      if (onAddJob) onAddJob(response.data);

      // Reset form after successful post
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
        isActive: true,
        closingDate: "",
      });
    } catch (error) {
      console.error("❌ Error posting job:", error);
      alert("Failed to post job. Please check the backend connection.");
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md h-[85vh] overflow-y-auto"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#CBD5E1 #F1F5F9",
      }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Job Type */}
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Job Type</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
        </select>

        {/* Experience Level */}
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Experience Level</option>
          <option value="ENTRY">Entry</option>
          <option value="MID">Mid</option>
          <option value="SENIOR">Senior</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          rows="3"
        />

        {/* Requirements */}
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Requirements"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          rows="3"
        />

        {/* Responsibilities */}
        <textarea
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="Responsibilities"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          rows="3"
        />

        {/* Salary Range */}
        <input
          type="text"
          name="salaryRange"
          value={formData.salaryRange}
          onChange={handleChange}
          placeholder="Salary Range (e.g., ₹30,000 - ₹50,000)"
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Closing Date */}
        <input
          type="date"
          name="closingDate"
          value={formData.closingDate}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Is Active */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <span>Active</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Upload Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;