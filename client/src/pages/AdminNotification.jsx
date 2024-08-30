import React, { useEffect, useState } from "react";
import Layout from "../components/dashboard/DashboardLayout";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BACKEND_API_URL } from "@/constants";

function AdminNotification() {
  const user = useSelector((state) => state?.userInfo?.user);
  const [notifications, setNotifications] = useState([]);
  const tabs = ["All", "seen", "unseen", "approved", "rejected"];
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchNotifications = async () => {

      if (!user || !user._id) {
        return; // Exit early if user or user._id is not defined
      }

      try {
        const response = await fetch(
          `${BACKEND_API_URL}/api/v1/notification/get-notification/${user._id}`
        );

        const result = await response.json();
        console.log(result);

        if (result.success) {
          setNotifications(result.notifications);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error("An error occurred while fetching notifications");
      }
    };
    fetchNotifications();
  }, [user]);

  const filterNotifications = () => {
    switch (activeTab) {
      case "All":
        return notifications;
      case "seen":
        return notifications.filter((notification) => notification.seen);
      case "unseen":
        return notifications.filter((notification) => !notification.seen);
      default:
        return notifications;
    }
  };
  const filteredNotifications = filterNotifications();

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
                  onClick={() => markAsSeen(notification?.data?.docterId)}
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

export default AdminNotification;
