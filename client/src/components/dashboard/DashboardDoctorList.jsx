import React, { useEffect, useState } from "react";
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
import Layout from "./DashboardLayout";
import DashboardDoctorCard from "./DashboardDoctorCard";

function DashboardDoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const doctorsPerPage = 6;

  useEffect(() => {
    fetchDoctorList()
      .then((response) => {
        // Filter doctors whose profiles are complete
        const completeDoctors = response.data.filter(
          (doctor) => doctor?.auth?.isProfileComplete
        );
        console.log(completeDoctors)
        setDoctorList(completeDoctors);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch doctor list.");
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
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold pb-2 border-b-2 mb-10 text-[#023e7d]">
        Top Specialists
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-5 mb-5 w-max">
          {currentDoctors.map((item, index) => (
            <DashboardDoctorCard
              doctor={item}
              key={index}
            ></DashboardDoctorCard>
          ))}
        </section>
        <Pagination
          total={Math.ceil(totalDoctors / doctorsPerPage)}
          current={currentPage}
          onPageChange={handlePageChange}
          
        >
          <PaginationContent
          style = {{
            color:"#023e7d"
          }}
          >
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
    </Layout>
  );
}

export default DashboardDoctorList;
