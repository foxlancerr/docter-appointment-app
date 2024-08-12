import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const tableBodyContent = [
  {
    name: "John Doe",
    gender: "Male",
    disease: "Flu",
    time: "10:00 AM",
  },
  {
    name: "Jane Smith",
    gender: "Female",
    disease: "Cold",
    time: "10:30 AM",
  },
  {
    name: "Michael Brown",
    gender: "Male",
    disease: "Asthma",
    time: "11:00 AM",
  },
  {
    name: "Emily Johnson",
    gender: "Female",
    disease: "Diabetes",
    time: "11:30 AM",
  },
  {
    name: "David Wilson",
    gender: "Male",
    disease: "Hypertension",
    time: "12:00 PM",
  },
  {
    name: "Sarah Lee",
    gender: "Female",
    disease: "Arthritis",
    time: "12:30 PM",
  },
  {
    name: "James Miller",
    gender: "Male",
    disease: "Flu",
    time: "1:00 PM",
  },
  {
    name: "Patricia Davis",
    gender: "Female",
    disease: "Migraine",
    time: "1:30 PM",
  },
  {
    name: "Robert Martinez",
    gender: "Male",
    disease: "Allergies",
    time: "2:00 PM",
  },
  {
    name: "Linda Anderson",
    gender: "Female",
    disease: "Anemia",
    time: "2:30 PM",
  },
];

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

const tableHeaderContent = ["Name", "Gender", "Desease", "Time", "Action"];
export default function BasicTable() {
  return (
    <div className="overflow-x-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-[#015A78]">Latest Patient</h1>
      <Table className="min-w-full divide-y divide-gray-200 shadow-md">
        <TableHeader className="bg-[#015A78]/80 text-white">
          <TableRow>
            {tableHeaderContent.map((item, index) => (
              <TableHead
                key={item + index}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  index == tableHeaderContent.length - 1 &&
                  "flex items-center justify-end"
                }`}
              >
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {tableBodyContent.map((list, index) => (
            <TableRow
              key={list.name}
              className="hover:bg-gray-100 items-center"
            >
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {list.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {list.gender}
              </TableCell>
              <TableCell className="">
                <p
                  className={`px-5 py-3 whitespace-nowrap font-bold text-sm w-max rounded-full ${getCellStyle(
                    index
                  )} text-center`}
                >
                  {list.disease}
                </p>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {list.time}
              </TableCell>

              <TableCell className="text-[1.2rem] text-gray-500 flex h-full justify-end gap-2 text-2xl items-center">
                {/* <span className="cursor-pointer">

                <BsThreeDotsVertical></BsThreeDotsVertical>
                </span> */}

                <Popover className="relative">
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <BsThreeDotsVertical />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="flex bg-white w-max flex-col gap-2 absolute right-2 top-0">
                    <span className="cursor-pointer flex items-center gap-2 px-3">
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
