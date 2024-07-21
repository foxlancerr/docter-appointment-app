import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { IoMdArrowForward } from "react-icons/io";
import { checkAvailabilityOfDoctors } from "@/utils/api-calls";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AppointmentCard = ({ fees, daysAvailable, _id }) => {
  const navigate = useNavigate();
  async function checkAvailability() {
    const response = await checkAvailabilityOfDoctors(_id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  async function bookAppointment() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate(`/patient/appointment/${_id}`);
      toast("Redirecting to appointment-page");
    } else {
      navigate("/signin");
      toast("Redirecting to Signin Page");
    }
  }
  
  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold text-gray-800">
          Let's Discuss
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex gap-5 flex-col">
        <div className="flex items-center border-b-2 border-b-gray-100 pb-2 justify-between">
          <p className="text-gray-700">Fees:</p>
          <p className="text-gray-700 font-semibold text-sm">Rs. {fees}</p>
        </div>
        <div className="flex items-center justify-between border-b-gray-100 pb-2 border-b-2 ">
          <p className="text-gray-700">Days:</p>
          <p className="flex gap-1">
            {daysAvailable?.map((day, index) => {
              return (
                <span
                  className="text-gray-700 font-semibold text-sm"
                  key={day + index}
                >
                  {day.substring(0, 3)},
                </span>
              );
            })}
          </p>
        </div>
        <div className="flex flex-col">
          {daysAvailable?.map((day, index) => {
            return (
              <div className="flex justify-between" key={day + index}>
                <h4 className="text-lg font-semibold text-gray-800">{day}</h4>
                <p className="text-gray-700">07:30 PM - 09:00 PM</p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 flex-col">
          <Button
            className="w-full bg-black text-white hover:bg-black/70 flex items-center justify-center"
            onClick={checkAvailability}
          >
            Check Availibility
            <IoMdArrowForward className="ml-2" />
          </Button>
          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
            onClick={bookAppointment}
          >
            Book Appointment
            <IoMdArrowForward className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
