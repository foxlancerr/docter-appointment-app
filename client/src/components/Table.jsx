import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdFemale } from "react-icons/io";
import { Avator1 } from "../../assets";
import { patientList } from "../constants";

function Table() {
  return (
    <div className="w-full">
      {/* THead */}
      <div className="bg-white-200 py-2 px-3">
        <div className="grid grid-cols-8 font-bold text-[12px] md:text-lg">
          <h1>#</h1>
          <h1 className="col-start-2 col-end-4">Patient</h1>
          <h1>Created At</h1>
          <h1>Gender</h1>
          <h1 className="text-center">Blood Group</h1>
          <h1 className="text-center">Age</h1>
          <h1>Action</h1>
        </div>
      </div>

      {/* Tbody */}
      <div className="py-2 px-3 my-3 flex flex-col gap-y-5">
        {patientList.map((tRow) => (
          <>
            <div
              key={tRow.id}
              className="grid grid-cols-8  text-black-100 text-[12px] md:text-sm items-center"
            >
              <h4 className="w-max">{tRow.id}</h4>
              <div className="col-start-2 col-end-4 flex gap-x-3 gap-y-1 md:items-center flex-col md:flex-row items-start ">
                <img
                  src={tRow.profileImg}
                  className="w-10 rounded-full "
                  alt="Image1"
                />
                <div>
                  <h1 className="font-bold text-black-300 text-sm">
                    {tRow.name}
                  </h1>
                  <p>{tRow.phone}</p>
                </div>
              </div>
              <h1>{tRow.createdDate}</h1>
              {/* Female   bg-orange-200 text-orange-800  */}
              {/* male   bg-green-200 text-green-800  */}
              <h1
                className={`w-max text-center py-1 px-2 md:px-5 font-bold rounded-full ${
                  tRow.colorStatus
                    ? "bg-green-200 text-green-800"
                    : "bg-orange-200 text-orange-800"
                }`}
              >
                {tRow.gender}
              </h1>
              <h1 className="text-center">{tRow.bloodGroup}</h1>
              <h1 className="text-center">{tRow.age}</h1>
              <span className="w-max h-max md:py-2 md:px-3 p-2 bg-white-300 cursor-pointer border-black-200/20 border-[.5px] rounded-lg ">
                <BsThreeDots className="md:text-[1.4rem] text-[1rem]"></BsThreeDots>
              </span>
            </div>
            <hr className="border-black-100/10" />
          </>
        ))}
      </div>
    </div>
  );
}

export default Table;
