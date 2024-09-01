import React from "react";
import doctorDemoImage from "../../../assets/images/doctor1.jpeg";
import { GoVerified } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import toast from "react-hot-toast";

function DoctorCard({ doctor }) {
  console.log(doctor)
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/doctors/${doctor._id}`);
  };

  async function bookAppointment() {
    navigate(`/dashboard/patient/appointment/${doctor._id}`);
    toast("Redirecting to appointment page...");
  }

  return (
    <Card className="p-5 bg-white shadow-lg rounded-lg w-full">
      <div className="flex flex-col md:flex-row gap-4 items-start w-full">
        {/* Doctor Image */}
        <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24">
          <img
            src={doctorDemoImage}
            alt="doctor"
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        {/* Doctor Information */}
        <div className="flex-grow flex flex-col gap-3 justify-between w-full">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#023e7d]">
                {doctor?.firstname } {doctor?.lastname}
              </h2>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <p className="text-xs md:text-sm font-semibold">PMC Verified</p>
                <GoVerified className="text-sm md:text-lg" />
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              {doctor.specialty}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              Experience: {doctor.yearsExperience} Year(s)
            </p>
            <div className="flex items-center text-sm mt-2">
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

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              className="px-4 py-2 border-2 rounded-full border-[#023e7d] text-[#023e7d] hover:bg-[#023e7d]/90 hover:text-white transition w-full md:w-auto"
              onClick={bookAppointment}
            >
              Book Appointment
            </button>
            <button
              className="px-4 py-2 border-2 rounded-full border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition w-full md:w-auto"
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
