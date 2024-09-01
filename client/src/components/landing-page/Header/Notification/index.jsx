import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_API_URL } from "@/constants";
import Layout from "@/components/dashboard/DashboardLayout";
import { DefaultTabs } from "@/components/shared/Tabs";
import { getItemFromLocalStorage } from "@/utils/webLocalStorage";
import dayjs from "dayjs";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/api/v1/notification/get-notification`,
        {
          headers: {
            Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
          },
        }
      );

      const result = response.data;
      if (result.success) {
        setNotifications(result.data);
      } else {
        toast.error("Failed to fetch notifications.");
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications.");
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [markAsSeen]);

  // Filter notifications based on their "seen" status
  const filterNotifications = (status) => {
    if (status === "all") return notifications;
    return notifications?.filter((notification) =>
      status === "seen" ? notification.seen : !notification.seen
    );
  };

  // Handle marking a notification as seen
  const markAsSeen = async (notificationId) => {
    try {
      const response = await axios.patch(
        `${BACKEND_API_URL}/api/v1/notification/mark-as-seen/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Notification marked as seen");
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, seen: true }
              : notification
          )
        );
      } else {
        toast.error("Failed to mark notification as seen.");
      }
    } catch (error) {
      console.error("Error marking notification as seen:", error);
      toast.error("Failed to mark notification as seen.");
    }
  };

  const tabsData = [
    {
      label: "All",
      component: () => (
        <NotificationList
          notifications={filterNotifications("all")}
          markAsSeen={markAsSeen}
        />
      ),
    },
    {
      label: "Seen",
      component: () => (
        <NotificationList
          notifications={filterNotifications("seen")}
          markAsSeen={markAsSeen}
        />
      ),
    },
    {
      label: "Unseen",
      component: () => (
        <NotificationList
          notifications={filterNotifications("unseen")}
          markAsSeen={markAsSeen}
        />
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-8 w-full">
        <h1 className="text-3xl font-semibold mb-4">Notifications</h1>
        <DefaultTabs tabsData={tabsData} />
      </div>
    </Layout>
  );
};

// Component to render notification list
const NotificationList = ({ notifications, markAsSeen }) => {
  return (
    <div className="mt-4 w-full">
      {notifications?.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className={`p-4 mb-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors ${
              notification.seen ? "bg-gray-50" : "bg-white"
            }`}
          >
            <p className="text-gray-700">{notification.message}</p>
            <div className="mt-2 flex justify-between items-end text-gray-500 text-sm">
            {dayjs(notification.createdAt).format('MM/DD/YYYY hh:mm A')}
          
            {!notification.seen && (
              <button
                className="mt-2 px-3 py-2 hover:bg-[#015a78] text-white text-sm rounded bg-black transition-colors"
                onClick={() => markAsSeen(notification._id)}
              >
                Mark as Seen
              </button>
            )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No notifications found.
        </p>
      )}
    </div>
  );
};

export default NotificationPage;
