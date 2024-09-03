import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GoUnverified, GoVerified } from "react-icons/go";
import { IoMdStar } from "react-icons/io";
import Layout from "./DashboardLayout";
import AppointmentCard from "../shared/bookAppointmentCard";
import { fetchDoctorById } from "@/utils/api-calls";

function DashboardDoctorDetail() {
  const { doctorId } = useParams();
  const [doctorDetail, setDoctorDetail] = useState({});
  //   const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication check

  console.log("id >>>>>>>>>>", doctorId)
  console.log("doctor details >>>>>>>>>>", doctorDetail)
  useEffect(() => {
    fetchDoctorById(doctorId)
      .then((response) => {
        setDoctorDetail(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [doctorId]);

  return (
    <Layout>
      <div className="container mx-10 flex justify-between flex-col-reverse sm:flex-row gap-5">
        {/* Main Content */}
        <div className="sm:w-[65%]">
          {" "}
          {/* Adjust right padding to make space for the sidebar */}
          <Card className="mb-5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#023e7d]">
                    {doctorDetail?.firstname} {doctorDetail?.lastname}
                  </CardTitle>
                  <CardDescription>{doctorDetail?.specialty}</CardDescription>
                  <div className="flex items-center mt-2">
                  {doctorDetail?.auth?.isAdminVerifyTheUser ? (
                <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <p className="text-xs md:text-sm font-semibold">
                    PMC Verified
                  </p>
                  <GoVerified className="text-sm md:text-lg" />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-yellow-300 text-black px-3 py-1 rounded-full">
                  <p className="text-xs md:text-sm font-semibold">
                    PMC Unverified
                  </p>
                  <GoUnverified className="text-lg md:text-lg" />
                </div>
              )}
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="flex text-yellow-500 text-lg">
                      <IoMdStar />
                      <IoMdStar />
                      <IoMdStar />
                      <IoMdStar />
                      <IoMdStar />
                    </span>
                    <p className="ml-2 text-sm text-gray-500">
                      {doctorDetail.reviews} reviews
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 font-semibold text-sm">
                    <span className="text-[#023e7d] font-semibold text-sm">
                      Experience:{" "}
                    </span>
                    {doctorDetail.yearsExperience} Years
                  </p>
                  <p className="text-gray-500 font-semibold text-sm">
                    <span className="text-[#023e7d] font-semibold text-sm">
                      Fees:{" "}
                    </span>
                    {doctorDetail.fees} PKR
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{doctorDetail.about}</p>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle className="text-[#023e7d]">Services</CardTitle>
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
              <CardTitle className="text-[#023e7d]">Education</CardTitle>
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
              <CardTitle className="text-[#023e7d]">Experience</CardTitle>
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
              <CardTitle className="text-[#023e7d]">Languages</CardTitle>
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
              <CardTitle className="text-[#023e7d]">Other Locations</CardTitle>
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
          <AppointmentCard {...doctorDetail} />
        </div>
      </div>
    </Layout>
  );
}

export default DashboardDoctorDetail;
