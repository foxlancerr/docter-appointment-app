import React from "react";
import doctorDemoImage from "../../../assets/images/doctor1.jpeg";
import { GoVerified } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import toast from "react-hot-toast";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  console.log(doctor);

  const handleViewProfile = () => {
    navigate(`/doctors/${doctor._id}`);
  };

  async function bookAppointment() {
    console.log(doctor._id);
    navigate(`/dashboard/patient/appointment/${doctor._id}`);
    toast("Redirecting to appointment-page");
  }
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
              <h2 className="text-2xl font-bold text-[#023e7d]">
                {doctor.name}
              </h2>
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
                {[...Array(doctor.reviews > 5 ? 5 : doctor.reviews)].map(
                  (_, index) => (
                    <IoMdStar key={index} />
                  )
                )}
              </div>
              <p className="ml-2 text-sm font-semibold text-gray-600">
                {doctor.reviews}+ reviews
              </p>
            </div>
          </div>

          <div className="gap-3 flex">
            <button
              className="px-4 py-2 border-2 rounded-full border-[#023e7d] text-[#023e7d] hover:bg-[#023e7d]/90 hover:text-white transition"
              onClick={bookAppointment}
            >
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
