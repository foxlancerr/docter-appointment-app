import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import { fetchDoctorList } from "@/utils/api-calls";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

function DoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const doctorsPerPage = 6;

  useEffect(() => {
    fetchDoctorList()
      .then((response) => {
        setDoctorList(response.data);
        setTotalDoctors(response.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filteredDoctors = doctorList?.filter((doctor) =>
    doctor?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page after a new search
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  return (
    <div className="container">
      <div className="flex gap-10  items-center px-10 justify-between mb-5">
        <h1>Top Specialists</h1>
        <div className="flex justify-between">
          <Input
            type="text"
            placeholder="Search by Name or Disease"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full  text-black bg-white border border-gray-300 rounded focus:outline-none focus:border-[#015A78]"
          />
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-5 overflow-hidden px-10">
        {currentDoctors.map((item, index) => (
          <DoctorCard doctor={item} key={index}></DoctorCard>
        ))}
      </section>

      <Pagination
        total={Math.ceil(totalDoctors / doctorsPerPage)}
        current={currentPage}
        onPageChange={handlePageChange}
      >
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {[...Array(Math.ceil(totalDoctors / doctorsPerPage))].map(
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  active={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          {currentPage < Math.ceil(totalDoctors / doctorsPerPage) && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DoctorList;
