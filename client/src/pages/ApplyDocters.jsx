import React from "react";
import Layout from "../components/Layout";
import InputBox from "../components/InputBox";

function ApplyDocters() {
  return (
    <Layout>
      <section>
        <form action="#" className="">
          <div className="bg-white-300 w-full p-10 max-md:p-6 rounded-[20px]">
            <h1 className="text-4xl font-extrabold mb-8">
              Apply Docter Account
            </h1>
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <InputBox type="text" label="First Name"></InputBox>
              <InputBox type="text" label="Last Name"></InputBox>
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox type="email" label="Email"></InputBox>
              <InputBox type="Phone" label="Phone Number"></InputBox>
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox type="text" label="First Name"></InputBox>
            </div>
          </div>
          <hr className="my-10" />
          <div className="bg-white-300 w-full p-10 max-md:p-6 rounded-[20px] mb-5">
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <InputBox type="text" label="Department"></InputBox>
              <InputBox type="text" label="Profession"></InputBox>
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox type="email" label="Experiance"></InputBox>
              <InputBox type="Phone" label="Address"></InputBox>
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox type="text" label="Fee Per Visit"></InputBox>
            </div>
          </div>

          <button className="bg-blue-800 rounded-[10px] text-2xl py-3 px-6 text-white flex float-right mr-[2%]">Submit</button>
        </form>
      </section>
    </Layout>
  );
}

export default ApplyDocters;
