import React from "react";
import Layout from "../components/Layout";
import InputBox from "../components/InputBox";
import toast from "react-hot-toast";
import { setItemInLocalStorage } from "../utils/webLocalStorage";
import { Navigate } from "react-router-dom";

function ApplyDocters() {
  const fetchData = async (data) => {
    try {
      // setLoad(true);
      const response = await fetch(
        "http://localhost:3000/api/v1/users/apply-as-docter",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      // setLoad(false);
      if (!result?.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        toast("Successfully Apply for Docter accounts");
        // setItemInLocalStorage("token", result.token);
        // Navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("apply-as-docter"));
    const formData = {};
    for (let [key, value] of form) {
      formData[key] = value;
    }
    fetchData(formData);
  };
  return (
    <Layout>
      <section>
        <form onSubmit={handleSubmit} id="apply-as-docter" className="">
          <div className="bg-white-300 w-full p-10 max-md:p-6 rounded-[20px]">
            <h1 className="text-4xl font-extrabold mb-8">
              Apply Docter Account
            </h1>
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <InputBox
                _name="firstname"
                type="text"
                label="First Name"
              ></InputBox>
              <InputBox
                _name="lastname"
                type="text"
                label="Last Name"
              ></InputBox>
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox
                _name="phone"
                type="Phone"
                label="Phone Number"
              ></InputBox>
             
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox 
              _name="address"
              type="text" label="Address"></InputBox>
            </div>
          </div>
          <hr className="my-10" />
          <div className="bg-white-300 w-full p-10 max-md:p-6 rounded-[20px] mb-5">
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <InputBox
                _name="department"
                type="text"
                label="Department"
              ></InputBox>
              <InputBox
                _name="profession"
                type="text"
                label="Profession"
              ></InputBox>
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox
                _name="experaince"
                type="text"
                label="Experaince"
              ></InputBox>
              <InputBox
                _name="address"
                type="Address"
                label="Address"
              ></InputBox>
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox
                _name="feePerConsultant"
                type="text"
                label="Fee Per Visit"
              ></InputBox>
              <InputBox _name="timing" type="time" label="Time"></InputBox>
            </div>
          </div>

          <button
            className="bg-blue-800 rounded-[10px] text-2xl py-3 px-6 text-white flex float-right mr-[2%]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default ApplyDocters;
