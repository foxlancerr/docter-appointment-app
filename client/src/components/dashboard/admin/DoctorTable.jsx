import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Switch } from "@/components/ui/switch"; // Import ShadCN UI Switch
import { BACKEND_API_URL, patientHero } from "@/constants";
import HomeCard from "../HomeCard";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import Layout from "../DashboardLayout";
import { useSelector } from "react-redux";

const getCellStyle = (isApproved) => {
  if (isApproved) {
    return "bg-green-300/90 text-green-700"; // Green for approved
  } else {
    return "bg-blue-300/90 text-blue-700"; // Blue for not approved
  }
};

export default function DoctorTableAdmin() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authenticUser = useSelector((state) => state?.userInfo?.user);


  const handleToggleApproval = async (id) => {
    try {
      const response = await axios.patch(
        `${BACKEND_API_URL}/api/v1/auth/approve/${id}`
      );
      if (response.status === 201) {
        toast.success(response?.data?.data?.message);
        // Update the doctor's approval status in the state
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor._id === id
              ? {
                  ...doctor,
                  auth: {
                    ...doctor.auth,
                    isAdminVerifyTheUser: !doctor.auth.isAdminVerifyTheUser,
                  },
                }
              : doctor
          )
        );
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/api/v1/doctor`);
        if (!Array.isArray(response.data.data)) {
          throw new Error("Invalid data format: Expected an array.");
        }
        // Filter only doctors with complete profiles
        setDoctors(
          response.data.data?.filter(
            (doctor) => doctor?.auth?.isProfileComplete
          )
        );
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_API_URL}/api/v1/patients/${id}`
      );
      if (response.status === 200) {
        toast.success("Doctor deleted successfully");
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== id)
        );
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
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

      {!doctors.length ? (
        <div>No Appointment found.</div>
      ) : (
        <Table className="min-w-full divide-y divide-gray-200 shadow-md">
          <TableHeader className="bg-[#015A78]/80 text-white">
            <TableRow>
              {["#", "Username", "Created At", "Approval Status", "Action"].map(
                (item, index) => {
                  // Hide "Approval Status" column for non-admin users
                  if (
                    item === "Approval Status" &&
                    authenticUser.userType !== "admin"
                  ) {
                    return null;
                  }

                  return (
                    <TableHead
                      key={item + index}
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        index === 4 && "flex items-center justify-end"
                      }`}
                    >
                      {item}
                    </TableHead>
                  );
                }
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor, index) => (
              <TableRow
                key={doctor._id}
                className="hover:bg-gray-100 items-center"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </TableCell>
                <TableCell className="px-6 py-4 flex gap-3 items-center whitespace-nowrap text-sm font-medium text-gray-900">
                  <img
                    src={doctor?.auth?.profileImage}
                    className="w-10 h-10 rounded-full bg-green-400"
                    alt="Doctor Profile"
                  />
                  <div>
                    <h1 className="font-bold text-black-300 text-sm">
                      {`${doctor?.firstname} ${doctor?.lastname}`}
                    </h1>
                    <p>{doctor.phone}</p>
                    <p>Address: {doctor?.address}</p>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {doctor.specialty}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {doctor?.yearsExperience} years
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${doctor?.fees}
                </TableCell>
                  {authenticUser?.userType == "admin" && <TableCell className="">
                  <p
                    className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                      doctor?.auth?.isAdminVerifyTheUser
                    )} text-center`}
                  >
                    <Switch
                      id={`switch-${doctor?._id}`}
                      checked={doctor?.auth?.isAdminVerifyTheUser}
                      onCheckedChange={() => handleToggleApproval(doctor?._id)}
                    />
                  </p>
                </TableCell> }
                <TableCell className="text-[1.2rem] text-gray-500 flex h-full justify-end gap-2 text-2xl items-center">
                  <Popover className="relative">
                    <PopoverTrigger asChild>
                      <span className="cursor-pointer">
                        <BsThreeDotsVertical />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="flex bg-white w-max flex-col gap-2 absolute right-2 top-0">
                      <span
                        className="cursor-pointer flex items-center gap-2 px-3"
                        onClick={() => {
                          navigate(`/doctors/${doctor._id}`);
                        }}
                      >
                        <span>View</span>
                      </span>
                      <span className=" cursor-pointer flex items-center gap-2 px-3">
                        <span onClick={() => handleDelete(doctor._id)}>
                          Delete
                        </span>
                      </span>
                    </PopoverContent>
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
