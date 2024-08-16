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

const tableHeaderContent = [
  "#",
  "Name",
  "Gender",
  "Disease",
  "Appointment Date",
  "Contact",
  "Time",
  "Action",
];

export default function BasicTable() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/patients"
        ); // Adjust the URL as needed

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
    <div className="overflow-x-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-[#015A78]">
        Latest Patients
      </h1>
      <Table className="min-w-full divide-y divide-gray-200 shadow-md">
        <TableHeader className="bg-[#015A78]/80 text-white">
          <TableRow>
            {tableHeaderContent.map((item, index) => (
              <TableHead
                key={item + index}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  index === tableHeaderContent.length - 1 &&
                  "flex items-center justify-end"
                }`}
              >
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {patients?.map((patient, index) => (
            <TableRow
              key={patient.id} // Assuming `id` is a unique identifier for each patient
              className="hover:bg-gray-100 items-center"
            >
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {patient.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {patient.gender}
              </TableCell>
              <TableCell className="">
                <p
                  className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                    index
                  )} text-center`}
                >
                  {patient?.allergies[0]?.allergen}
                </p>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {patient.appointmentDate &&
                !isNaN(new Date(patient.appointmentDate).getTime())
                  ? new Date(patient.appointmentDate).toLocaleDateString()
                  : "10:40AM"}
              </TableCell>

              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {patient?.emergencyContact?.phone}{" "}
                {/* Assuming there's a field for the patient's contact information */}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {patient.time}{" "}
                {/* Assuming `time` represents the appointment time */}
              </TableCell>
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
                        navigate(`/patient-detail/${patient._id}`);
                      }}
                    >
                      <span>View</span>
                    </span>
                    <span className=" cursor-pointer flex items-center gap-2 px-3">
                      <span>Delete</span>
                    </span>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
