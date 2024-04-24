import React, { useState } from "react";
import Layout from "../components/Layout";
import { avatorImages } from "../constants";
import { IoCalendarNumberOutline, IoCopyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function Notification() {
  const user = useSelector((state) => state?.userInfo?.user);
  const tabs = ["All", "seen", "unseen", "approved", "rejected"];
  const [activeTab, setActiveTab] = useState("All");

  return (
    <Layout>
      <div className="w-full my-3 flex border-b-4 ">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className="text-xl p-3 capitalize block cursor-pointer"
          >
            {tab}
          </span>
        ))}
      </div>
      <section className="flex flex-col py-10">
        {user?.unseenNotifications?.map((notification, index) => (
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
              <button className="bg-blue-1 px-4 py-2  rounded text-white bg-red-600 text-xl">
                Reject
              </button>
              <button className="bg-white/15 flex items-center px-4 py-2 rounded text-white bg-blue-600 text-xl">
                Approve
              </button>
            </div>
          </div>
        ))}
      </section>
    </Layout>
    // <Layout>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    //     {user?.unseenNotifications?.map((notification, index) => (
    //       <section
    //         key={index}
    //         className="bg-black-200 text-white min-h-[258px] w-full rounded-[10px] p-6 flex flex-col justify-between"
    //       >
    //         <article className="flex flex-col justify-start gap-2">

    //           <h1 className="text-2xl font-bold">
    //             {notification?.message}
    //           </h1>
    //           <h3 className="text-xl">
    //             March 15, 2024 - <span>10.00AM</span>{" "}
    //           </h3>
    //         </article>
    //         <article className="relative">
    //           <div className="relative flex">
    //             {avatorImages.slice(0, 3).map((img, index) => (
    //               <img
    //                 src={img}
    //                 alt="img"
    //                 key={index}
    //                 width={35}
    //                 height={35}
    //                 className="object-cover absolute rounded-full"
    //                 style={{
    //                   top: 2,
    //                   left: index * 28,
    //                 }}
    //               ></img>
    //             ))}
    //             <div
    //               className="absolute w-[40px] h-[40px] bg-black flex justify-center items-center rounded-full"
    //               style={{
    //                 top: 0,
    //                 left: 3 * 28,
    //               }}
    //             >
    //               +{avatorImages.length - 3}
    //             </div>
    //           </div>
    //           <div className="flex gap-3 items-center justify-end">
    //             <button className="bg-blue-1 px-4 py-2  rounded text-white bg-red-600">
    //               Reject
    //             </button>
    //             <button className="bg-white/15 flex items-center px-4 py-2 rounded text-white bg-blue-600">
    //               Approve
    //             </button>
    //           </div>
    //         </article>
    //       </section>
    //     ))}
    //   </div>
    // </Layout>
  );
}

export default Notification;
