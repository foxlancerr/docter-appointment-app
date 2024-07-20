import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaMapMarkerAlt,
  FaCalendarDay,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
const AppointmentCard = ({ fees, daysAvailable }) => {
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
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center">
          Book Appointment
          <IoMdArrowForward className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
