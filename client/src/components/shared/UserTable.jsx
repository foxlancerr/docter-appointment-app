// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table";
//   import { BsThreeDotsVertical } from "react-icons/bs";
//   import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
//   import { useEffect, useState } from "react";
//   import axios from "axios";
//   import { useNavigate } from "react-router-dom";
//   import toast from "react-hot-toast";
//   import dayjs from "dayjs";
  
//   const getCellStyle = (index) => {
//     switch (index % 4) {
//       case 0:
//         return "bg-blue-300/20 text-blue-700";
//       case 2:
//         return "bg-orange-300/20 text-orange-700";
//       default:
//         return "";
//     }
//   };
  
//   const tableHeaderContent = [
//     "#",
//     "Name",
//     "Gender",
//     "DOB",
//     "Approve/Disapprove",
//     "Action",
//   ];
  
//   export default function UserTable() {
//     const navigate = useNavigate();
//     const [patients, setPatients] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState(""); // Single search term state
  
//     const handleDelete = async (id) => {
//       try {
//         const response = await axios.delete(
//           `http://localhost:3000/api/v1/patients/${id}`
//         );
//         if (response.status === 200) {
//           toast.success("Patient deleted successfully");
//           setPatients((prevPatients) =>
//             prevPatients.filter((patient) => patient._id !== id)
//           );
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       const fetchPatients = async () => {
//         try {
//           const response = await axios.get(
//             "http://localhost:3000/api/v1/patients"
//           );
//           if (!Array.isArray(response.data.data)) {
//             throw new Error("Invalid data format: Expected an array.");
//           }
//           setPatients(response.data.data);
//         } catch (error) {
//           setError(error.response?.data?.message || error.message);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchPatients();
//     }, []);
  
//     const filteredPatients = patients.filter((patient) =>
//       patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
//       (patient?.allergies[0]?.allergen || "").toLowerCase()?.includes(searchTerm?.toLowerCase())
//     );
  
//     if (loading) {
//       return <div>Loading...</div>;
//     }
  
//     if (error) {
//       return <div className="text-red-500">Error: {error}</div>;
//     }
  
//     if (!patients.length) {
//       return <div>No patients found.</div>;
//     }
  

  
//     return (
//         <Table className="min-w-full divide-y divide-gray-200 shadow-md">
//           <TableHeader className="bg-[#015A78]/80 text-white">
//             <TableRow>
//               {tableHeaderContent.map((item, index) => (
//                 <TableHead
//                   key={item + index}
//                   className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
//                     index === tableHeaderContent.length - 1 &&
//                     "flex items-center justify-end"
//                   }`}
//                 >
//                   {item}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody className="bg-white divide-y divide-gray-200">
//             {filteredPatients?.map((patient, index) => (
//               <TableRow
//                 key={patient.id + index}
//                 className="hover:bg-gray-100 items-center"
//               >
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {index + 1}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 flex gap-3 items-center whitespace-nowrap text-sm font-medium text-gray-900">
//                   <img
//                     src={patient?.profileImage}
//                     className="w-10 h-10 rounded-full"
//                     alt="Image1"
//                   />
//                   <div>
//                     <h1 className="font-bold text-black-300 text-sm">
//                       {patient?.name}
//                     </h1>
//                     <p>{patient?.phone}</p>
//                   </div>
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {patient?.gender}
//                 </TableCell>
//                 <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {dayjs(patient?.dateOfBirth).format('DD MMM YYYY')}
//                 </TableCell>
//                 <TableCell className="">
//                   <p
//                     className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
//                       index
//                     )} text-center`}
//                   >
//                     {patient?.allergies[0]?.allergen}
//                   </p>
//                 </TableCell>
             
  
              
             
//                 <TableCell className="text-[1.2rem] text-gray-500 flex h-full justify-end gap-2 text-2xl items-center">
//                   <Popover className="relative">
//                     <PopoverTrigger asChild>
//                       <span className="cursor-pointer">
//                         <BsThreeDotsVertical />
//                       </span>
//                     </PopoverTrigger>
//                     <PopoverContent className="flex bg-white w-max flex-col gap-2 absolute right-2 top-0">
//                       <span
//                         className="cursor-pointer flex items-center gap-2 px-3"
//                         onClick={() => {
//                           navigate(`/patient-detail/${patient._id}`);
//                         }}
//                       >
//                         <span>View</span>
//                       </span>
//                       <span className=" cursor-pointer flex items-center gap-2 px-3">
//                         <span onClick={() => handleDelete(patient._id)}>
//                           Delete
//                         </span>
//                       </span>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//     );
//   }
  

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
import { Label } from "@/components/ui/label";  // Import ShadCN UI Label if needed
import { BACKEND_API_URL } from "@/constants";

const getCellStyle = (isApproved) => {
  console.log("isApproved >>>>>>>",isApproved)
  if (isApproved) {
    return "bg-green-300/90 text-green-700"; // Green for approved
  }  else{
   return "bg-blue-300/90 text-blue-700";
  }
};

export default function UserTable() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleApproval = async (id) => {
    try {
    
      const response = await axios.patch(
        `${BACKEND_API_URL}/api/v1/auth/approve/${id}`,
      );
      console.log('called')
      if (response.status === 201) {
        toast.success(response?.data?.data?.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}/api/v1/patients`
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
        `${BACKEND_API_URL}/api/v1/patients/${id}`
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

 

  const filteredPatients = patients.filter((patient) =>
    patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    (patient?.allergies[0]?.allergen || "")
      .toLowerCase()
      ?.includes(searchTerm?.toLowerCase())
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
    <Table className="min-w-full divide-y divide-gray-200 shadow-md">
      <TableHeader className="bg-[#015A78]/80 text-white">
        <TableRow>
          {["#", "Name", "Gender", "DOB", "Approve/Disapprove", "Action"].map(
            (item, index) => (
              <TableHead
                key={item + index}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  index === 5 && "flex items-center justify-end"
                }`}
              >
                {item}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        {filteredPatients.map((patient, index) => (
          <TableRow
            key={patient.id + index}
            className="hover:bg-gray-100 items-center"
          >
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {index + 1}
            </TableCell>
            <TableCell className="px-6 py-4 flex gap-3 items-center whitespace-nowrap text-sm font-medium text-gray-900">
              <img
                src={patient?.auth?.profileImage}
                className="w-10 h-10 rounded-full"
                alt="Image1"
              />
              <div>
                <h1 className="font-bold text-black-300 text-sm">
                  {`${patient?.firstname} ${patient?.lastname}`}
                </h1>
                <p>{patient?.phone}</p>
              </div>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {patient?.gender}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {dayjs(patient?.dateOfBirth).format("DD MMM YYYY")}
            </TableCell>
            <TableCell className="">
              <p
                className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                  index,
                  patient.isApprove
                )} text-center`}
              >
                <Switch
                  id={`switch-${patient._id}`}
                  checked={patient.isUserVerified}
                  onCheckedChange={() =>
                    handleToggleApproval(patient._id)
                  }
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
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
