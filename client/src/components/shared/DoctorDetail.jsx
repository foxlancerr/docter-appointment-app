import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDoctorById } from "@/utils/api-calls";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GoVerified } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import HomeLayout from "../HomeLayout";
import AppointmentCard from "./bookAppointmentCard";

function DoctorDetail() {
  const { id } = useParams();
  const [doctorDetail, setDoctorDetail] = useState({});
  //   const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication check

  console.log(doctorDetail);
  useEffect(() => {
    fetchDoctorById(id)
      .then((response) => {
        setDoctorDetail(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <HomeLayout>
      <div className="container mx-auto p-5 flex justify-between flex-col-reverse sm:flex-row gap-5">
        {/* Main Content */}
        <div className="sm:w-[65%]">
          {" "}
          {/* Adjust right padding to make space for the sidebar */}
          <Card className="mb-5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{doctorDetail.name}</CardTitle>
                  <CardDescription>{doctorDetail.specialty}</CardDescription>
                  <div className="flex items-center mt-2">
                    {doctorDetail.verified && (
                      <div className="flex gap-2 items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        <p className="text-xs font-semibold">PMC Verified</p>
                        <GoVerified className="text-lg" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="flex text-yellow-500 text-lg">
                      {[...Array(doctorDetail.reviews)].map((_, index) => (
                        <IoMdStar key={index} />
                      ))}
                    </span>
                    <p className="ml-2 text-sm text-gray-500">
                      {doctorDetail.reviews} reviews
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">
                    Experience: {doctorDetail.yearsExperience} Years
                  </p>
                  <p className="text-gray-500">Fees: Rs. {doctorDetail.fees}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{doctorDetail.about}</p>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {doctorDetail.services?.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {doctorDetail.education?.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {doctorDetail.experience?.map((exp, index) => (
                  <li key={index}>
                    {exp.position} at {exp.hospital} ({exp.yearStart} -{" "}
                    {exp.yearEnd || "Present"})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {doctorDetail.languages?.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Other Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {doctorDetail.otherLocations?.map((location, index) => (
                  <li key={index}>{location}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="sm:w-[30%]">
          <AppointmentCard
            fees={doctorDetail.fees}
            daysAvailable={doctorDetail.daysAvailable}
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default DoctorDetail;
