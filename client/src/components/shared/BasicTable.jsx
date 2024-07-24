// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { BsThreeDotsVertical } from "react-icons/bs";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

// const tableHeaderContent = ["Name", "Gender", "Desease", "Time", "Action"];
// export default function BasicTable() {
//   return (
//     <Table>
//       <TableHeader className="bg-[#015A78]/80 text-white text-xl rounded-full">
//         <TableRow className="">
//           {tableHeaderContent.map((item, index) => {
//             return <TableHead key={item + index} className="font-bold py-5">{item}</TableHead>;
//           })}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {invoices.map((invoice) => (
//           <TableRow key={invoice.invoice}>
//             <TableCell>{invoice.invoice}</TableCell>
//             <TableCell>{invoice.paymentStatus}</TableCell>
//             <TableCell>{invoice.paymentMethod}</TableCell>
//             <TableCell>{invoice.totalAmount}</TableCell>
//             <TableCell className="text-2xl text-black/70 flex flex-end">
//               <BsThreeDotsVertical></BsThreeDotsVertical>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";

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
            <TableRow key={list.name} className="hover:bg-gray-100 items-center">
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

              <TableCell className="text-[1.2rem] text-gray-500 flex h-full justify-end items-center">
                <BsThreeDotsVertical />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
