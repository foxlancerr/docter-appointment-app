import React from "react";
import { MdBookmarkAdded } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbReportMoney } from "react-icons/tb";
import { BACKEND_API_URL } from "@/constants";
import axios from "axios";
import { useEffect, useState } from "react";

function HomeCardV1() {
  // State to hold the stats fetched from the API
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalUsers: 0,
    totalPatients: 0,
    totalDoctors: 0,
  });

  // Fetch the stats from the backend API when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/api/v1/stats/dashboard-v3-stats`
        );
        setStats(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 my-10 px-4">
      {/* Registered Users Card */}
      <div className="flex items-center justify-center w-full bg-[#015A78] rounded-xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out p-6 sm:p-8 md:p-10">
        <div className="flex gap-5 items-center">
          <span className="text-4xl p-3 sm:p-4 md:p-5 bg-white rounded-full">
            <MdBookmarkAdded className="text-[#A6207D]" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg sm:text-xl text-white">Register Users</h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {stats?.totalUsers || 20}
            </h1>
          </div>
        </div>
      </div>

      {/* Total Patients Card */}
      <div className="flex items-center justify-center w-full bg-[#015A78] rounded-xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out p-6 sm:p-8 md:p-10">
        <div className="flex gap-5 items-center">
          <span className="text-4xl p-3 sm:p-4 md:p-5 bg-white rounded-full">
            <HiOutlineUserGroup className="text-[#A6207D]" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg sm:text-xl text-white">Total Patient</h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {stats?.totalPatients || 10}+
            </h1>
          </div>
        </div>
      </div>

      {/* Active Appointments Card */}
      <div className="flex items-center justify-center w-full bg-[#015A78] rounded-xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out p-6 sm:p-8 md:p-10">
        <div className="flex gap-5 items-center">
          <span className="text-4xl p-3 sm:p-4 md:p-5 bg-white rounded-full">
            <TbReportMoney className="text-[#A6207D]" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg sm:text-xl text-white">Active Appointment</h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {stats?.totalAppointments}
            </h1>
          </div>
        </div>
      </div>

      {/* Total Doctors Card */}
      <div className="flex items-center justify-center w-full bg-[#015A78] rounded-xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out p-6 sm:p-8 md:p-10">
        <div className="flex gap-5 items-center">
          <span className="text-4xl p-3 sm:p-4 md:p-5 bg-white rounded-full">
            <TbReportMoney className="text-[#A6207D]" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg sm:text-xl text-white">Total Doctors</h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {stats?.totalDoctors}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCardV1;
