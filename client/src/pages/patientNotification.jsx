import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function PatientNotification() {
  const user = useSelector((state) => state?.userInfo?.user);
  const tabs = ["All", "seen", "unseen", "approved", "rejected"];
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filterNotifications = () => {
    const unseenNotifications = user?.unseenNotifications || [];
    const seenNotifications = user?.seenNotifications || [];
    const allNotifications = [...unseenNotifications, ...seenNotifications];

    switch (activeTab) {
      case "All":
        return allNotifications;
      case "seen":
        return seenNotifications;
      case "unseen":
        return unseenNotifications;
      case "approved":
        return allNotifications.filter(
          (notification) =>
            user?.isDocter && notification?.data?.status === "approved"
        );
      case "rejected":
        return allNotifications.filter(
          (notification) =>
            user?.isDocter && notification?.data?.status === "rejected"
        );
      default:
        return [];
    }
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

  const markAsSeen = async (notificationId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/notification/seen/${notificationId}`,
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
        toast.success("Notification marked as seen");
        // Update local state or refetch notifications
      } else {
        toast.error("Failed to mark notification as seen");
      }
    } catch (err) {
      toast.error("An error occurred while marking notification as seen");
    }
  };

  return (
    <Layout>
      <div className="w-full my-3 flex border-b-4 ">
        {tabs.map((tab, index) => (
          <span
            key={index + tab}
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
              {activeTab === "unseen" && (
                <button
                  className="bg-blue-500 px-4 py-2 rounded text-white text-xl"
                  onClick={() => markAsSeen(notification._id)}
                >
                  Mark as Seen
                </button>
              )}
              <button
                className="bg-red-600 px-4 py-2 rounded text-white text-xl"
                onClick={() => handleReject(notification.data.docterId)}
              >
                Reject
              </button>
              <button
                className="bg-green-500 px-4 py-2 rounded text-white text-xl"
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

export default PatientNotification;
