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
import { BACKEND_API_URL } from "@/constants";
import { useSelector } from "react-redux";

const getCellStyle = (isApproved) => {
  return isApproved
    ? "bg-green-300/90 text-green-700"
    : "bg-blue-300/90 text-blue-700";
};

export default function UserTable() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const authenticUser = useSelector((state) => state?.userInfo?.user);

  const handleToggleApproval = async (id) => {
    try {
      const response = await axios.patch(
        `${BACKEND_API_URL}/api/v1/auth/approve/${id}`
      );
      if (response.success) {
        toast.success(response?.data?.message);
        // Optionally refresh data or update the specific patient status locally
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/api/v1/auth/users`
        );
        if (!Array.isArray(response.data.data)) {
          throw new Error("Invalid data format: Expected an array.");
        }
        setPatients(response.data.data);
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
        `${BACKEND_API_URL}/api/v1/auth/users/${id}`
      );
      if (response.status === 200) {
        toast.success("Patient deleted successfully");
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== id)
        );
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const filteredPatients = patients?.filter((patient) =>
    patient?.username?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!patients.length) {
    return <div>No patients found.</div>;
  }

  return (
    <Table className="divide-y divide-gray-200 shadow-md">
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
        {filteredPatients?.map((patient, index) => (
          <TableRow
            key={patient._id + index}
            className="hover:bg-gray-100 items-center relative"
          >
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {index + 1}
            </TableCell>
            <TableCell className="px-6 py-4 flex gap-3 items-center whitespace-nowrap text-sm font-medium text-gray-900">
              <img
                src={patient?.profileImage}
                className="w-10 h-10 rounded-full"
                alt="Profile"
              />
              <div>
                <h1 className="font-bold text-black-300 text-sm">
                  {patient?.username}
                </h1>
                <p>{patient?.email}</p>
              </div>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {dayjs(patient?.createdAt).format("DD MMM YYYY")}
            </TableCell>
            {authenticUser?.userType == "admin" && (
              <TableCell className="">
                <p
                  className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                    patient.isProfileComplete
                  )} text-center`}
                >
                  <Switch
                    id={`switch-${patient._id}`}
                    checked={patient.isAdminVerifyTheUser}
                    onCheckedChange={() => handleToggleApproval(patient._id)}
                  />
                </p>
              </TableCell>
            )}
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
                    onClick={() =>
                      navigate(`/dashboard/user-details/${patient._id}`)
                    }
                  >
                    <span>View</span>
                  </span>
                  <span
                    className="cursor-pointer flex items-center gap-2 px-3"
                    onClick={() => handleDelete(patient._id)}
                  >
                    <span>Delete</span>
                  </span>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
