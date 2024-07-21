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

function DoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctorList.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );


  return (
    <div className="container mx-auto">
      <h1>Top Specialists</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 gap-x-5 mb-5">
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
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
          )}
          {[...Array(Math.ceil(totalDoctors / doctorsPerPage))].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                active={index + 1 === currentPage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < Math.ceil(totalDoctors / doctorsPerPage) && (
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DoctorList;
