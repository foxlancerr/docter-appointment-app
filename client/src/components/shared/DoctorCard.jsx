// import React from "react";
// import doctorDemoImage from "../../../assets/images/doctor1.jpeg";
// import { GoVerified } from "react-icons/go";
// import { IoMdStar } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { Card } from "../ui/card";

// function DoctorCard({ doctor }) {
//   const handleViewProfile = () => {
//     navigate(`/doctors/${doctor._id}`);
//   };
//   const navigate = useNavigate();
//   return (
//     <Card className="p-5 rounded-md bg-slate-100">
//       <div className="top-contnent flex flex-wrap justify-between items-start w-full">
//         <div className="content-wrapper flex gap-3 w-full ">
//           <img
//             src={doctorDemoImage}
//             alt="doctor"
//             className="object-cover w-20"
//           />

//           <div className="flex flex-col gap-3 sm:flex-row justify-between  w-full ">
//             <div className="">
//               <div className="flex items-start gap-3">
//                 <h2 className="text-[20px] font-bold text-black/70">
//                   {doctor.name}
//                 </h2>
//                 <div className="flex gap-2 items-center bg-blue-300 text-blue-800 px-3 py-2 rounded-full">
//                   <p className="text-[12px] font-semibold">PMC verifeid</p>
//                   <span className="text-1xl">
//                     <GoVerified></GoVerified>
//                   </span>
//                 </div>
//               </div>

//               <p className="text-sm text-gray-800 mt-2">{doctor.specialty}</p>
//               <p className="text-sm text-gray-800">
//                 Experaince: {doctor.yearsExperience} Year(s)
//               </p>
//               <span className="flex gap-2 items-center text-sm">
//                 <span className="text-yellow-500 flex text-lg">
//                   <IoMdStar></IoMdStar>
//                   <IoMdStar></IoMdStar>
//                   <IoMdStar></IoMdStar>
//                   <IoMdStar></IoMdStar>
//                   <IoMdStar></IoMdStar>
//                 </span>
//                 <p className="text-sm font-semibold text-gray-800">
//                   {doctor.reviews}+ reviews
//                 </p>
//               </span>
//             </div>

//             <div id="buttons" className="flex sm:flex-col gap-3">
//               <button className="px-4 py-2 border-2 rounded-full border-blue-500 text-blue-500">
//                 Book Appointment
//               </button>
//               <button
//                 className="px-4 py-2 border-2 rounded-full border-gray-800 text-gray-800"
//                 onClick={handleViewProfile}
//               >
//                 View Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bottom-contnent"></div>
//     </Card>
//   );
// }

// export default DoctorCard;


import React from "react";
import doctorDemoImage from "../../../assets/images/doctor1.jpeg";
import { GoVerified } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";

function DoctorCard({ doctor }) {
  const handleViewProfile = () => {
    navigate(`/doctors/${doctor._id}`);
  };
  const navigate = useNavigate();
  return (
    <Card className="p-5 bg-white shadow-lg rounded-lg">
      <div className="flex flex-wrap justify-between items-start w-full">
        <div className="flex gap-3 w-full sm:w-1/3 lg:w-1/4">
          <img
            src={doctorDemoImage}
            alt="doctor"
            className="object-cover w-20 h-20 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-3 justify-between w-full sm:w-2/3 lg:w-3/4">
          <div className="flex-grow">
            <div className="flex items-start gap-3">
              <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
              <div className="flex gap-2 items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <p className="text-xs font-semibold">PMC Verified</p>
                <GoVerified className="text-lg" />
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-2">{doctor.specialty}</p>
            <p className="text-sm text-gray-600">
              Experience: {doctor.yearsExperience} Year(s)
            </p>
            <div className="flex gap-2 items-center text-sm mt-2">
              <div className="flex text-yellow-500 text-lg">
                {[...Array(doctor.reviews > 5 ? 5 : doctor.reviews)].map((_, index) => (
                  <IoMdStar key={index} />
                ))}
              </div>
              <p className="ml-2 text-sm font-semibold text-gray-600">
                {doctor.reviews}+ reviews
              </p>
            </div>
          </div>

          <div className="gap-3 flex">
            <button className="px-4 py-2 border-2 rounded-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">
              Book Appointment
            </button>
            <button
              className="px-4 py-2 border-2 rounded-full border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition"
              onClick={handleViewProfile}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DoctorCard;
