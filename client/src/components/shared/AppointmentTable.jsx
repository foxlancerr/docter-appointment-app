import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Switch } from "@/components/ui/switch"; // Import ShadCN UI Switch
import { Label } from "@/components/ui/label"; // Import ShadCN UI Label if needed
import { BACKEND_API_URL, patientHero } from "@/constants";
import HomeCard from "../dashboard/HomeCard";
import { getItemFromLocalStorage } from "@/utils/webLocalStorage";
import Layout from "../dashboard/DashboardLayout";
import { useSelector } from "react-redux";

export default function AppointmentTable() {
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggleApproval = async (id) => {
    try {
      const response = await axios.patch(
        `${BACKEND_API_URL}/api/v1/auth/approve/${id}`
      );
      if (response.status === 201) {
        toast.success(response?.data?.data?.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const authenticUser = useSelector((state) => state?.userInfo?.user);

  // Construct the API URL based on user type
  const appointmentUrl =
    authenticUser.userType === "admin"
      ? `${BACKEND_API_URL}/api/v1/appointments`
      : `${BACKEND_API_URL}/api/v1/appointments/specific-doctor/`;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(appointmentUrl, {
          headers: {
            Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
          },
        });
        if (!Array.isArray(response.data.data)) {
          throw new Error("Invalid data format: Expected an array.");
        }
        setPatientList(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_API_URL}/api/v1/patients/${id}`
      );
      if (response.status === 200) {
        toast.success("Patient deleted successfully");
        setPatientList((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== id)
        );
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  // Helper function to get cell styles based on the index
  const getCellStyle = (index) => {
    switch (index % 4) {
      case 0:
        return "bg-blue-300/20 text-blue-700";
      case 1:
        return "bg-green-300/20 text-green-700";
      case 2:
        return "bg-orange-300/20 text-orange-700";
      case 3:
        return "bg-pink-300/20 text-pink-700";
      default:
        return "";
    }
  };

  const getApproveStyle = (isApproved) => {
    return isApproved
      ? "bg-green-300/90 text-green-700"
      : "bg-red-300/90 text-blue-700";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Layout>
      <section className="grid gap-10 mb-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {patientHero.map((item) => (
          <HomeCard
            key={item.title}
            ClassName={item.ClassName}
            tagline={item.tagline}
            title={item.title}
            route={item.route}
            Icon={item.Icon}
          ></HomeCard>
        ))}
      </section>

      {!patientList.length ? (
        <div>No Appointment found.</div>
      ) : (
        <Table className="min-w-full divide-y divide-gray-200 shadow-md">
          <TableHeader className="bg-[#015A78]/80 text-white">
            <TableRow>
              {[
                "#",
                "Patient",
                "DOB",
                "Doctor ",
                "Disease",
                "appointment Date/Time",
                "Approve/Disapprove",
                "Action",
              ].map((item, index) => (
                <TableHead
                  key={item + index}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    index === 5 && "flex items-center justify-end"
                  }`}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {patientList.map((patient, index) => (
              <TableRow
                key={patient.id + index}
                className="hover:bg-gray-100 items-center"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </TableCell>
                <TableCell className="px-6 py-4 flex gap-3 items-center whitespace-nowrap text-sm font-medium text-gray-900">
                  <img
                    src={patient?.patient?.auth?.profileImage}
                    className="w-10 h-10 rounded-full"
                    alt="Image1"
                  />
                  <div>
                    <h1 className="font-bold text-black-300 text-sm">
                      {`${patient?.patient?.firstname} ${patient?.patient?.lastname}`}
                    </h1>
                    <p>{patient?.patient?.phone}</p>
                    <p>
                      <span className="font-bold text-black-300 text-sm">
                        Gender:{" "}
                      </span>
                      {patient?.patient?.gender}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {dayjs(patient?.patient?.dateOfBirth).format("DD MMM YYYY")}
                </TableCell>

                <TableCell className="px-6 py-4 flex gap-3 items-center whitespace-nowrap text-sm font-medium text-gray-900">
                  <img
                    src={patient?.doctor?.auth?.profileImage}
                    className="w-10 h-10 rounded-full"
                    alt="Image1"
                  />
                  <div>
                    <h1 className="font-bold text-black-300 text-sm">
                      {`${patient?.doctor?.firstname} ${patient?.doctor?.lastname}`}
                    </h1>
                    <p>{patient?.doctor?.phone}</p>
                    <p>
                      <span className="font-bold text-black-300 text-sm">
                        Gender:{" "}
                      </span>
                      {patient?.doctor?.gender || "Not Specified"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="">
                  <p
                    className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                      index
                    )} text-center`}
                  >
                    {patient?.patient?.allergies?.[0]?.allergen}
                  </p>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {dayjs(patient?.startTime).format("DD MM YYYY-hh:mm A")}
                </TableCell>

                <TableCell className="">
                  <p
                    className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getApproveStyle(
                      patient.isApprove
                    )} text-center`}
                  >
                    <Switch
                      id={`switch-${patient?.patient?._id}`}
                      checked={patient.isUserVerified}
                      onCheckedChange={() => handleToggleApproval(patient._id)}
                    />
                  </p>
                </TableCell>
                <TableCell className="text-[1.2rem] text-gray-500 flex h-full justify-end gap-2 text-2xl items-center">
                  <Popover className="relative">
                    <PopoverTrigger asChild>
                      <span className="cursor-pointer">
                        <BsThreeDotsVertical />
                      </span>
                    </PopoverTrigger>
                    {authenticUser.userType === "admin" ||
                      (authenticUser.userType == "doctor" && (
                        <PopoverContent className="flex bg-white w-max flex-col gap-2 absolute right-2 top-0">
                          <span
                            className="cursor-pointer flex items-center gap-2 px-3"
                            onClick={() => {
                              navigate(`/patient-detail/${patient._id}`);
                            }}
                          >
                            <span>View</span>
                          </span>
                          <span className=" cursor-pointer flex items-center gap-2 px-3">
                            <span onClick={() => handleDelete(patient._id)}>
                              Delete
                            </span>
                          </span>
                        </PopoverContent>
                      ))}
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Layout>
  );
}
