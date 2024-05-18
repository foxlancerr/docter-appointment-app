import React from "react";
import Layout from "../components/Layout";
import InputBox from "../components/InputBox";
import toast from "react-hot-toast";
import { setItemInLocalStorage } from "../utils/webLocalStorage";
import { Navigate } from "react-router-dom";

function ApplyDoctors() {
  const fetchData = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/apply-as-doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (!result?.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        toast("Successfully Applied for Doctor Account");
      }
    } catch (err) {
      console.log("Already applied for Doctor Account");
      toast.error("already applied for Doctor Account");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("apply-as-doctor"));
    const formData = {};
    for (let [key, value] of form.entries()) {
      if (key === "daysAvailable") {
        if (!formData[key]) {
          formData[key] = [];
        }
        formData[key].push(value);
      } else {
        formData[key] = value;
      }
    }
  
    console.log("Form Data:", formData);
  
    fetchData(formData);
  };
  

  return (
    <Layout>
      <section>
        <form onSubmit={handleSubmit} id="apply-as-doctor" className="">
          <div className="bg-white p-10 rounded-2xl shadow-lg max-md:p-6">
            <h1 className="text-4xl font-extrabold mb-8">
              Apply Doctor Account
            </h1>
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <InputBox _name="firstname" type="text" label="First Name" />
              <InputBox _name="lastname" type="text" label="Last Name" />
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox _name="phone" type="tel" label="Phone Number" />
              <InputBox _name="email" type="email" label="Email" />
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox _name="address" type="text" label="Address" />
            </div>
          </div>
          <hr className="my-10" />
          <div className="bg-white p-10 rounded-2xl shadow-lg max-md:p-6">
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <InputBox _name="department" type="text" label="Department" />
              <InputBox _name="profession" type="text" label="Profession" />
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox
                _name="experience"
                type="number"
                label="Experience (Years)"
              />
              <InputBox
                _name="license"
                type="text"
                label="Medical License Number"
              />
            </div>
            <div className="grid grid-cols-2 mt-3 gap-5 max-md:grid-cols-1">
              <InputBox
                _name="feePerConsultation"
                type="number"
                label="Fee Per Consultation"
              />
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Days Available
                </label>
                <div className="grid grid-cols-4">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        id={day}
                        name="daysAvailable"
                        value={day}
                        className="mr-2"
                      />
                      <label htmlFor={day} className="text-base">{day}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Available Timing
                </label>
                <div className="flex gap-x-5">
                  <InputBox _name="startTime" type="time" label="Start Time" />
                  <InputBox _name="endTime" type="time" label="End Time" />
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-blue-800 rounded-2xl text-2xl py-3 px-6 text-white mt-8 float-right"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default ApplyDoctors;
