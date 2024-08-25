import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../DashboardLayout";

function DoctorProfilePage() {
  const { id } = useParams();
  const [doctorDetail, setDoctorDetail] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/doctors/${id}`
        ); // Replace with actual API endpoint
        if (response.data.data) {
          setDoctorDetail(response.data.data);
          setAppointments(response.data.data.appointments || []);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetail();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetail({ ...doctorDetail, [name]: value });
  };

  const handleSwitchToggle = (field) => {
    setDoctorDetail({ ...doctorDetail, [field]: !doctorDetail[field] });
  };

  const handleSave = () => {
    // Implement save functionality to update doctor profile
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {/* Doctor's Personal Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-[#023e7d]">Doctor Profile</h2>
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  src={doctorDetail.profileImage}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-gray-700">
                {doctorDetail.name}
              </p>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={doctorDetail.email || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#023e7d] focus:border-[#023e7d] sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-800">{doctorDetail.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Phone</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={doctorDetail.phone || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#023e7d] focus:border-[#023e7d] sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-800">{doctorDetail.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="specialization"
                    value={doctorDetail.specialization || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#023e7d] focus:border-[#023e7d] sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-800">{doctorDetail.specialization}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          {isEditing && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-[#023e7d]">Profile Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="flex items-center">
                  <label className="block text-gray-700 font-semibold">
                    Receive Notifications
                  </label>
                  <input
                    type="checkbox"
                    checked={doctorDetail.receiveNotifications || false}
                    onChange={() => handleSwitchToggle("receiveNotifications")}
                    className="ml-3 h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-[#023e7d]"
                  />
                </div>

                <div className="flex items-center">
                  <label className="block text-gray-700 font-semibold">
                    Accept New Patients
                  </label>
                  <input
                    type="checkbox"
                    checked={doctorDetail.acceptNewPatients || false}
                    onChange={() => handleSwitchToggle("acceptNewPatients")}
                    className="ml-3 h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-[#023e7d]"
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Current Appointment List */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#023e7d]">Current Appointments</h3>
          <ul className="mt-4 space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-md p-4 shadow-sm"
                >
                  <p className="text-gray-800">
                    <strong>Patient:</strong> {appointment.patientName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Time:</strong>{" "}
                    {new Date(appointment.time).toLocaleTimeString()}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No current appointments.</p>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default DoctorProfilePage;
