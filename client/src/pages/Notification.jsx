import React, { useState } from "react";
import Layout from "../components/Layout";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Notification() {
  const user = useSelector((state) => state?.userInfo?.user);
  const tabs = ["All", "seen", "unseen", "approved", "rejected"];
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filterNotifications = () => {
    const allNotifications = [
      ...user?.unseenNotifications,
      ...user?.seenNotifications,
    ];

    if (activeTab === "All") {
      return allNotifications;
    } else if (activeTab === "seen") {
      return user?.seenNotifications;
    } else if (activeTab === "unseen") {
      return user?.unseenNotifications;
    } else if (activeTab === "approved") {
      return allNotifications.filter(
        (notification) => user?.isDocter && notification?.status === "approved"
      );
    } else if (activeTab === "rejected") {
      return allNotifications.filter(
        (notification) => user?.isDocter && notification?.status === "rejected"
      );
    }
    return [];
  };

  const filteredNotifications = filterNotifications();

  const handleApprove = async (doctorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/doctor/approve/${doctorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`, // assuming you're using JWT for authentication
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Update local state or refetch notifications
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("An error occurred while approving the doctor");
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/doctor/reject/${doctorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // assuming you're using JWT for authentication
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Update local state or refetch notifications
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("An error occurred while rejecting the doctor");
    }
  };

  return (
    <Layout>
      <div className="w-full my-3 flex border-b-4 ">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className={`text-xl p-3 capitalize block cursor-pointer ${
              activeTab === tab ? "font-bold underline text-blue-600" : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </span>
        ))}
      </div>
      <section className="flex flex-col py-10">
        {filteredNotifications?.map((notification, index) => (
          <div
            key={index}
            className="flex justify-between bg-white-300 mb-5 border-b-4 border-black-100-300 p-6 rounded gap-5"
          >
            <div>
              <h1 className="text-2xl font-bold">
                Dr. {notification?.data?.name}
              </h1>
              <p className="text-xl">{notification?.message}</p>
            </div>

            <div className="flex gap-3 items-center justify-end">
              <button
                className="bg-blue-1 px-4 py-2  rounded text-white bg-red-600 text-xl"
                onClick={() => handleReject(notification.data.docterId)}
              >
                Reject
              </button>
              <button
                className="bg-white/15 flex items-center px-4 py-2 rounded text-white bg-green-500 text-xl"
                onClick={() => handleApprove(notification.data.docterId)}
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export default Notification;
